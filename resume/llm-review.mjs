#!/usr/bin/env node
// Advisory LLM résumé review — runs in CI on PRs, NOT in pre-commit.
// Reads the diff vs the base branch and flags honesty / confidentiality /
// consistency issues a deterministic linter can't catch. Non-blocking by
// default (exit 0); set REVIEW_FAIL_ON=high to fail the job on high-severity.
import Anthropic from "@anthropic-ai/sdk";
import { execFileSync } from "node:child_process";

const base = process.env.GITHUB_BASE_REF
  ? `origin/${process.env.GITHUB_BASE_REF}`
  : "origin/master";

let diff = "";
try {
  diff = execFileSync("git", ["diff", `${base}...HEAD`, "--", "docs/"], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
} catch {
  diff = execFileSync("git", ["diff", "HEAD~1", "--", "docs/"], { encoding: "utf8" });
}

if (!diff.trim()) {
  console.log("No résumé diff to review.");
  process.exit(0);
}

const RUBRIC = `You are reviewing a diff to a PUBLIC résumé website (real name + current employer attached). Flag ONLY genuine issues in the added/changed lines. Be specific; do not invent problems.

Check these dimensions:
1. OVERCLAIM — verb/scope inflation vs what's defensible: "migration" where it was parallel operation, "led/sole owner" where it was collaboration, "production" where it was evaluation/PoC, absolute superlatives.
2. CONFIDENTIALITY — a PUBLIC résumé should not expose absolute internal scale/financials: exact AWS cost in USD, exact infra counts that reveal business scale, account IDs, internal hostnames. Relative %/buckets ("~30 channels", "数百 repo", "约降两成") are fine. Also flag CONCENTRATION: if many precise internal numbers cluster together they collectively expose infra scale.
3. CONSISTENCY — the same fact stated differently across zh/en or across variant pages (e.g. "600 repos" one place, "数百 repo" another; channel/DAG counts that disagree).
4. UNSUPPORTED — a metric or claim with no basis, or a fabricated-looking number.
5. TONE — buzzword soup, empty superlatives, or claims that read as inflated even if individually true.

Return findings as JSON. Empty array if clean. severity: high (likely false/leak/overclaim) | medium (questionable) | low (nit).`;

const schema = {
  type: "object",
  additionalProperties: false,
  properties: {
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          severity: { type: "string", enum: ["high", "medium", "low"] },
          dimension: {
            type: "string",
            enum: ["overclaim", "confidentiality", "consistency", "unsupported", "tone"],
          },
          location: { type: "string", description: "file and/or the quoted phrase" },
          issue: { type: "string" },
          suggestion: { type: "string" },
        },
        required: ["severity", "dimension", "location", "issue", "suggestion"],
      },
    },
  },
  required: ["findings"],
};

const client = new Anthropic();
const response = await client.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 8000,
  thinking: { type: "adaptive" },
  system: RUBRIC,
  messages: [{ role: "user", content: `Review this résumé diff:\n\n${diff}` }],
  output_config: { format: { type: "json_schema", schema } },
});

const text = response.content.find((b) => b.type === "text")?.text ?? "{}";
const { findings = [] } = JSON.parse(text);

const order = { high: 0, medium: 1, low: 2 };
findings.sort((a, b) => order[a.severity] - order[b.severity]);

const lines = [];
if (!findings.length) {
  lines.push("✓ LLM résumé review: no issues found.");
} else {
  lines.push(`## LLM résumé review — ${findings.length} finding(s)\n`);
  for (const f of findings) {
    const icon = { high: "🔴", medium: "🟡", low: "⚪" }[f.severity];
    lines.push(`- ${icon} **${f.severity}/${f.dimension}** — ${f.location}`);
    lines.push(`  - ${f.issue}`);
    lines.push(`  - → ${f.suggestion}`);
  }
}
const out = lines.join("\n");
console.log(out);

if (process.env.GITHUB_STEP_SUMMARY) {
  const { appendFileSync } = await import("node:fs");
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, out + "\n");
}

const failOn = process.env.REVIEW_FAIL_ON;
if (failOn === "high" && findings.some((f) => f.severity === "high")) {
  console.error("\n✗ High-severity findings present (REVIEW_FAIL_ON=high).");
  process.exit(1);
}
process.exit(0);
