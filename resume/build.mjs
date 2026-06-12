#!/usr/bin/env node
// Build 2-page A4 PDFs from the same markdown VitePress renders.
// Pipeline: md -> substitute "### Title @@ Date" (#job) and <Projects /> (auto+manual list)
//           -> pandoc (frontmatter+body, custom typst template) -> typst compile.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const template = resolve(here, "resume.typ.template");
const tmp = resolve(here, ".tmp");
const outDir = resolve(repo, "docs/public/pdf");
const dataDir = resolve(repo, "docs/.vitepress/data");

// [input md, output pdf basename, lang, variant]
const targets = [
  ["docs/index.md", "resume-ai-zh", "zh", "ai"],
  ["docs/en/index.md", "resume-ai-en", "en", "ai"],
  ["docs/sre.md", "resume-sre-zh", "zh", "sre"],
  ["docs/en/sre.md", "resume-sre-en", "en", "sre"],
  ["docs/detail.md", "resume-detail-zh", "zh", "detail"],
  ["docs/en/detail.md", "resume-detail-en", "en", "detail"],
  ["docs/platform.md", "resume-platform-zh", "zh", "platform"],
  ["docs/en/platform.md", "resume-platform-en", "en", "platform"],
];

const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback);
const auto = readJson(resolve(dataDir, "projects.auto.json"), []);
const manual = readJson(resolve(dataDir, "projects.manual.json"), {});
const skills = readJson(resolve(dataDir, "skills.json"), {});

function projectsMarkdown(lang, compact) {
  const sep = lang === "en" ? " — " : "：";
  let list = [...auto.map((p) => ({ name: p.name, desc: p.desc, url: p.url })), ...(manual[lang] || manual.zh || [])];
  // Compact variants (ai/sre/platform): collapse the whole list into ONE inline
  // line of linked names to keep the PDF to 2 pages. Website + detail PDF keep
  // the full bulleted list with descriptions.
  if (compact) {
    const names = list.map((p) => (p.url ? `[${p.name}](${p.url})` : p.name));
    return "- " + names.join(" · ");
  }
  return list
    .map((p) => {
      const nm = p.url ? `[${p.name}](${p.url})` : p.name;
      let line = `- **${nm}**` + (p.desc ? sep + p.desc : "");
      if (p.links) line += p.links.map((l) => ` · [${l.label} ↗](${l.url})`).join("");
      return line;
    })
    .join("\n");
}

function sortSkillItems(items) {
  return [...items].sort((a, b) => {
    const pri = (it) => (it.hl || it.badge ? 0 : 1);
    return pri(a) - pri(b);
  });
}

function sortSkillCategories(cats) {
  return [...cats].sort((a, b) => {
    const pri = (cat) => (cat.hero ? 0 : 1);
    return pri(a) - pri(b);
  });
}

function skillsMarkdown(variant, lang, compact) {
  const cfg = skills[variant]?.[lang] || skills[variant]?.zh;
  if (!cfg) return "";
  const lines = [];
  // Compact variants: skip headline + signature line to save vertical space.
  if (cfg.headline && !compact) lines.push(cfg.headline, "");
  if (cfg.signature?.length && !compact) {
    const label = lang === "en" ? "Core strengths" : "招牌能力";
    lines.push(`**${label}**：${cfg.signature.join(" · ")}`, "");
  }
  for (const cat of sortSkillCategories(cfg.categories || [])) {
    const items = sortSkillItems(cat.items).map((it) => {
      let s = it.name;
      if (it.badge) s += `（${it.badge}）`;
      return s;
    }).join("、");
    lines.push(`- **${cat.title}**：${items}`);
  }
  return lines.join("\n");
}

function preprocess(md, lang, variant) {
  // "### Title @@ Date" -> raw typst job() block
  md = md.replace(/^### (.+?) @@ (.+)$/gm, (_, title, date) => {
    const esc = (s) => s.trim().replace(/\\/g, "\\\\").replace(/]/g, "\\]");
    return "\n```{=typst}\n#job([" + esc(title) + "])[" + esc(date) + "]\n```\n";
  });
  // <Projects /> component -> generated markdown bullet list (only eat horizontal ws,
  // so the blank lines around the token stay intact and the next heading survives)
  md = md.replace(/^[ \t]*<Projects\s*\/>[ \t]*$/m, projectsMarkdown(lang, variant !== "detail"));
  md = md.replace(/^[ \t]*<Skills\s*\/>[ \t]*$/m, skillsMarkdown(variant, lang, variant !== "detail"));
  return md;
}

mkdirSync(tmp, { recursive: true });
mkdirSync(outDir, { recursive: true });

let built = 0;
for (const [rel, name, lang, variant] of targets) {
  const src = resolve(repo, rel);
  let md;
  try { md = readFileSync(src, "utf8"); }
  catch { console.warn("skip (missing): " + rel); continue; }

  const pre = resolve(tmp, name + ".md");
  const typ = resolve(tmp, name + ".typ");
  const pdf = resolve(outDir, name + ".pdf");

  writeFileSync(pre, preprocess(md, lang, variant));
  execFileSync("pandoc", [pre, "--template=" + template, "-f", "markdown", "-t", "typst", "-o", typ], { stdio: "inherit" });
  execFileSync("typst", ["compile", typ, pdf], { stdio: "inherit" });
  console.log("built " + name + ".pdf");
  built++;
}
rmSync(tmp, { recursive: true, force: true });
console.log("done: " + built + " pdf(s)");
