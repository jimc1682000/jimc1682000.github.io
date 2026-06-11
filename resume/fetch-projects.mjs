#!/usr/bin/env node
// Auto-detect the user's other GitHub Pages projects and write them as data.
// Used by both the web build (Projects.vue) and the PDF build (build.mjs).
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const USER = "jimc1682000";
const MAIN = USER + ".github.io";
const out = resolve(repo, "docs/.vitepress/data/projects.auto.json");
const denyPath = resolve(here, "projects.denylist.json");
const deny = existsSync(denyPath) ? JSON.parse(readFileSync(denyPath, "utf8")) : [];
const overridePath = resolve(here, "projects.override.json");
const overrides = existsSync(overridePath) ? JSON.parse(readFileSync(overridePath, "utf8")) : {};

const headers = { Accept: "application/vnd.github+json", "User-Agent": "resume-build" };
if (process.env.GITHUB_TOKEN) headers.Authorization = "Bearer " + process.env.GITHUB_TOKEN;

let repos;
try {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers });
  if (!res.ok) throw new Error("GitHub API " + res.status);
  repos = await res.json();
} catch (e) {
  console.error("fetch-projects: " + e.message);
  // Keep any previously generated file rather than blanking the section.
  if (existsSync(out)) { console.error("keeping existing projects.auto.json"); process.exit(0); }
  process.exit(1);
}

const projects = repos
  .filter((r) => r.has_pages && !r.fork && !r.archived && r.name !== MAIN && !deny.includes(r.name))
  .map((r) => {
    const patch = overrides[r.name] || {};
    return {
      name: r.name,
      desc: patch.desc || r.description || "",
      url: `https://${MAIN}/${r.name}/`,
      repo: r.html_url,
      pushed: r.pushed_at,
    };
  });

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(projects, null, 2) + "\n");
console.log(`fetch-projects: wrote ${projects.length} project(s) -> ${projects.map((p) => p.name).join(", ")}`);
