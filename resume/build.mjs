#!/usr/bin/env node
// Build 2-page A4 PDFs from the same markdown VitePress renders.
// Pipeline: md -> pre-substitute "### Title @@ Date" into raw typst #job() -> pandoc (frontmatter+body, custom typst template) -> typst compile.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const template = resolve(here, "resume.typ.template");
const tmp = resolve(here, ".tmp");
const outDir = resolve(repo, "docs/public/pdf");

// [input md, output pdf basename]
const targets = [
  ["docs/index.md", "resume-general-zh"],
  ["docs/en/index.md", "resume-general-en"],
  ["docs/platform.md", "resume-platform-zh"],
  ["docs/en/platform.md", "resume-platform-en"],
];

mkdirSync(tmp, { recursive: true });
mkdirSync(outDir, { recursive: true });

function preprocess(md) {
  // "### Title @@ Date" -> raw typst job() block (escape ] just in case)
  return md.replace(/^### (.+?) @@ (.+)$/gm, (_, title, date) => {
    const esc = (s) => s.trim().replace(/\\/g, "\\\\").replace(/]/g, "\\]");
    return "\n```{=typst}\n#job([" + esc(title) + "])[" + esc(date) + "]\n```\n";
  });
}

let built = 0;
for (const [rel, name] of targets) {
  const src = resolve(repo, rel);
  let md;
  try { md = readFileSync(src, "utf8"); }
  catch { console.warn("skip (missing): " + rel); continue; }

  const pre = resolve(tmp, name + ".md");
  const typ = resolve(tmp, name + ".typ");
  const pdf = resolve(outDir, name + ".pdf");

  writeFileSync(pre, preprocess(md));
  execFileSync("pandoc", [pre, "--template=" + template, "-f", "markdown", "-t", "typst", "-o", typ], { stdio: "inherit" });
  execFileSync("typst", ["compile", "--font-path", "/System/Library/Fonts", typ, pdf], { stdio: "inherit" });
  console.log("built " + name + ".pdf");
  built++;
}
rmSync(tmp, { recursive: true, force: true });
console.log("done: " + built + " pdf(s)");
