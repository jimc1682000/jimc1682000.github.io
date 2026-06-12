#!/usr/bin/env bash
# Local advisory résumé review via the Codex CLI (no API key / CI secret).
# Pipes the diff + rubric to `codex exec`. Run before pushing:  npm run review
# Optional arg: base ref to diff against (default: origin/master, else working tree).
set -euo pipefail

repo="$(git rev-parse --show-toplevel)"
base="${1:-origin/master}"

# Only résumé markdown — exclude binary PDFs and data JSON (invalid UTF-8 for the model).
paths=("docs/*.md" "docs/en/*.md")
if git -C "$repo" rev-parse --verify --quiet "$base" >/dev/null; then
  diff="$(git -C "$repo" diff "$base" -- "${paths[@]}")"
else
  diff="$(git -C "$repo" diff -- "${paths[@]}")" # uncommitted working-tree changes
fi

if [ -z "${diff//[$' \t\n']/}" ]; then
  echo "No résumé diff to review."
  exit 0
fi

read -r -d '' RUBRIC <<'EOF' || true
You are reviewing a diff to a PUBLIC résumé website (real name + current employer attached).
Flag ONLY genuine issues in the added/changed lines. Be specific; do not invent problems.
Do not modify any files — this is a read-only review. Output a short findings list, then stop.

Dimensions:
1. OVERCLAIM — verb/scope inflation: "migration" where it was parallel operation, "led/sole owner"
   where it was collaboration, "production" where it was evaluation/PoC, unearned superlatives.
2. CONFIDENTIALITY — a PUBLIC résumé must not expose absolute internal scale/financials: exact AWS
   cost in USD, exact infra counts revealing business scale, account IDs, internal hostnames.
   Relative %/buckets ("~30 channels", "数百 repo", "约降两成") are fine. Also flag CONCENTRATION:
   many precise internal numbers clustered together collectively expose infra scale.
3. CONSISTENCY — same fact stated differently across zh/en or across variant pages.
4. UNSUPPORTED — a metric/claim with no basis or a fabricated-looking number.
5. TONE — buzzword soup, empty superlatives.

For each finding output one line:  [severity high|med|low] [dimension] location — issue → suggestion
If clean, output exactly: CLEAN
EOF

out="$(mktemp)"
trap 'rm -f "$out"' EXIT
printf '%s\n\n--- DIFF ---\n%s\n' "$RUBRIC" "$diff" \
  | codex exec --sandbox read-only --skip-git-repo-check -o "$out" - >/dev/null
cat "$out"
