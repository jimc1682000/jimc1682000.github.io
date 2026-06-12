#!/usr/bin/env node
// Deterministic résumé guardrails — fast, offline, no LLM.
// Run in pre-commit. LLM judgement checks live in CI (resume/llm-review.mjs).
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const docs = resolve(repo, "docs");

const errors = [];
const warnings = [];

// Collect résumé markdown (layout: resume) under docs/ and docs/en/
const mdFiles = [];
for (const dir of [docs, resolve(docs, "en")]) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    const p = resolve(dir, f);
    const txt = readFileSync(p, "utf8");
    if (/^layout:\s*resume/m.test(txt)) {
      mdFiles.push({ p, rel: p.slice(repo.length + 1).replace(/\\/g, "/"), txt });
    }
  }
}

// ── 1. build target + PDF link sync ──────────────────────────────
const buildSrc = readFileSync(resolve(here, "build.mjs"), "utf8");
const targetMds = [...buildSrc.matchAll(/"(docs\/[^"]+\.md)"/g)].map((m) => m[1]);

for (const f of mdFiles) {
  if (!targetMds.includes(f.rel)) {
    errors.push(`build.mjs has no PDF target for ${f.rel} — add it to targets[]`);
  }
  const m = f.txt.match(/^pdf:\s*(\S+)/m);
  if (!m) {
    warnings.push(`${f.rel}: no \`pdf:\` frontmatter`);
  } else {
    const pdfPath = resolve(docs, "public" + m[1]); // /pdf/x.pdf -> docs/public/pdf/x.pdf
    if (!existsSync(pdfPath)) {
      errors.push(`${f.rel}: declares pdf ${m[1]} but file missing — run \`npm run pdf\``);
    }
  }
}

// ── 2. markdown structure (glued bullets from bad edits) ──────────
for (const f of mdFiles) {
  f.txt.split("\n").forEach((line, i) => {
    if (/[）)】] ?- \*\*/.test(line)) {
      errors.push(`${f.rel}:${i + 1}: glued bullets (missing newline) — "${line.trim().slice(0, 50)}…"`);
    }
  });
}

// ── 3. PII / secret leakage ───────────────────────────────────────
const piiRules = [
  [/\b\d{12}\b/, "AWS account id (12 digits)"],
  [/\b09\d{2}-?\d{6}\b/, "TW mobile number"],
  [/\b(AKIA|ASIA)[A-Z0-9]{16}\b/, "AWS access key"],
  [/\bsk-[A-Za-z0-9]{20,}\b/, "API key / token"],
  [/[a-z0-9.-]+\.catchplay\.com|prod\/[a-z0-9-]+\/services/i, "internal hostname / secret path"],
];
for (const f of mdFiles) {
  for (const [re, label] of piiRules) {
    const m = f.txt.match(re);
    if (m) errors.push(`${f.rel}: possible ${label} — "${m[0]}"`);
  }
}

// ── 4. factual blocklist (grows with every correction) ────────────
// Each entry: a phrase we have decided is WRONG, plus the reason.
const banned = [
  ["MySQL → PostgreSQL 遷移", "DB is parallel operation, not a migration"],
  ["MySQL → PostgreSQL migration", "DB is parallel operation, not a migration"],
  ["MySQL / PostgreSQL migration", "use 'parallel operation'"],
  ["切分遷移", "Redis→Valkey is an upgrade, not a split migration"],
  ["Valkey 7 migration", "Redis→Valkey is an upgrade"],
  ["Valkey 7 遷移", "Redis→Valkey 是升級，非遷移"],
  ["AI 協作建置 EKS", "EKS was co-built with a colleague — use 與同事協作"],
  ["600 repo", "use 數百 repo / hundreds (conservative, avoids exact internal scale)"],
  ["600 repos", "use hundreds of repos (conservative)"],
  ["~30 頻道", "channel count blurred for confidentiality — use 多頻道"],
  ["~30-channel", "channel count blurred — use multi-channel"],
  ["~180 DAG", "DAG count blurred for confidentiality — use 大量 DAG / many DAGs"],
];
for (const f of mdFiles) {
  for (const [phrase, why] of banned) {
    if (f.txt.includes(phrase)) errors.push(`${f.rel}: banned phrase "${phrase}" — ${why}`);
  }
}

// ── 5. zh / en parity (section count drift) ───────────────────────
const pairs = [
  ["docs/index.md", "docs/en/index.md"],
  ["docs/detail.md", "docs/en/detail.md"],
  ["docs/sre.md", "docs/en/sre.md"],
  ["docs/platform.md", "docs/en/platform.md"],
];
const h2 = (txt) => (txt.match(/^## /gm) || []).length;
for (const [z, e] of pairs) {
  const zt = mdFiles.find((f) => f.rel === z)?.txt;
  const et = mdFiles.find((f) => f.rel === e)?.txt;
  if (zt && et && h2(zt) !== h2(et)) {
    warnings.push(`${z} vs ${e}: '##' section count differs (${h2(zt)} vs ${h2(et)}) — zh/en out of sync?`);
  }
}

// ── report ────────────────────────────────────────────────────────
for (const w of warnings) console.warn(`⚠  ${w}`);
for (const e of errors) console.error(`✗  ${e}`);

if (errors.length) {
  console.error(`\n✗ résumé validate: ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}
console.log(`✓ résumé validate: clean (${warnings.length} warning(s))`);
