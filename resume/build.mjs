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

// [input md, output pdf basename, lang]
const targets = [
  ["docs/index.md", "resume-general-zh", "zh"],
  ["docs/en/index.md", "resume-general-en", "en"],
  ["docs/platform.md", "resume-platform-zh", "zh"],
  ["docs/en/platform.md", "resume-platform-en", "en"],
];

const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback);
const auto = readJson(resolve(dataDir, "projects.auto.json"), []);
const manual = readJson(resolve(dataDir, "projects.manual.json"), {});

function projectsMarkdown(lang) {
  const sep = lang === "en" ? " — " : "：";
  const list = [...auto.map((p) => ({ name: p.name, desc: p.desc, url: p.url })), ...(manual[lang] || manual.zh || [])];
  return list
    .map((p) => {
      const nm = p.url ? `[${p.name}](${p.url})` : p.name;
      return `- **${nm}**` + (p.desc ? sep + p.desc : "");
    })
    .join("\n");
}

function preprocess(md, lang) {
  // "### Title @@ Date" -> raw typst job() block
  md = md.replace(/^### (.+?) @@ (.+)$/gm, (_, title, date) => {
    const esc = (s) => s.trim().replace(/\\/g, "\\\\").replace(/]/g, "\\]");
    return "\n```{=typst}\n#job([" + esc(title) + "])[" + esc(date) + "]\n```\n";
  });
  // <Projects /> component -> generated markdown bullet list (only eat horizontal ws,
  // so the blank lines around the token stay intact and the next heading survives)
  md = md.replace(/^[ \t]*<Projects\s*\/>[ \t]*$/m, projectsMarkdown(lang));
  return md;
}

mkdirSync(tmp, { recursive: true });
mkdirSync(outDir, { recursive: true });

let built = 0;
for (const [rel, name, lang] of targets) {
  const src = resolve(repo, rel);
  let md;
  try { md = readFileSync(src, "utf8"); }
  catch { console.warn("skip (missing): " + rel); continue; }

  const pre = resolve(tmp, name + ".md");
  const typ = resolve(tmp, name + ".typ");
  const pdf = resolve(outDir, name + ".pdf");

  writeFileSync(pre, preprocess(md, lang));
  execFileSync("pandoc", [pre, "--template=" + template, "-f", "markdown", "-t", "typst", "-o", typ], { stdio: "inherit" });
  execFileSync("typst", ["compile", typ, pdf], { stdio: "inherit" });
  console.log("built " + name + ".pdf");
  built++;
}
rmSync(tmp, { recursive: true, force: true });
console.log("done: " + built + " pdf(s)");
