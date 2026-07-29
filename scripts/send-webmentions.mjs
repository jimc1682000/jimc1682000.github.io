#!/usr/bin/env node
// 發送 webmention（P2-13）：掃描已建好的文章，對正文裡的外部連結通知對方。
//
// 為什麼需要：我們已能「收」webmention（rel=webmention + 顯示區），但不會「送」——
// 連到別人的文章時對方收不到通知，IndieWeb 的互惠性只做了一半。
//
// 三個刻意的範圍限制：
//   1. 只掃 e-content 內的連結。header/footer/nav 的社群連結出現在每一頁，
//      若一併發送等於對同一批網站重複轟炸，且那不是作者在文章裡引用的東西。
//   2. 日期閘門（--since，預設 2026-01-01）。匯入的 2014–2017 Blogger 舊文有近 200 個
//      外部連結，多半已失效；對十年前的文章回溯通知是噪音，不是互惠。
//   3. 已送過的 (source, target) 記在狀態檔，不重複送。規格要求接收端能處理重複，
//      但每次部署都重送仍然沒禮貌。
//
// 失敗一律不影響 CI：探索不到端點、對方掛掉、超時，都只記錄後繼續。
//
// 用法：
//   node scripts/send-webmentions.mjs --dist dist --site https://jimmychen.me \
//     [--state .webmention-sent.json] [--since 2026-01-01] [--dry-run]

import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const DIST = arg('dist', 'dist');
const SITE = arg('site', 'https://jimmychen.me').replace(/\/$/, '');
const STATE = arg('state', '.webmention-sent.json');
const SINCE = new Date(arg('since', '2026-01-01'));
const DRY = args.includes('--dry-run');
const TIMEOUT = 10_000;

/** 遞迴收集文章的 index.html（只走 blog 目錄） */
async function postFiles(dir) {
  const out = [];
  async function walk(d) {
    let entries;
    try {
      entries = await readdir(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name === 'index.html') out.push(p);
    }
  }
  for (const sub of ['blog', path.join('en', 'blog')]) await walk(path.join(dir, sub));
  return out;
}

/** dist/blog/foo/index.html → https://site/blog/foo/ */
function sourceUrl(file) {
  const rel = path
    .relative(DIST, file)
    .replace(/index\.html$/, '')
    .replace(/\\/g, '/');
  return `${SITE}/${rel}`;
}

// 本站的所有對外主機名。少列任何一個，就會對自己送 webmention
//（例如舊文裡寫到的 *.pages.dev，其端點正是我們自己的 webmention.io）。
const OWN_HOSTS = new Set([
  new URL(SITE).host,
  'www.jimmychen.me',
  'jimmychen.pages.dev',
  'mirror.jimmychen.me',
  'jimc1682000.github.io',
]);

function isOwn(u) {
  try {
    return OWN_HOSTS.has(new URL(u).host);
  } catch {
    return true; // 解析不出來的一律不送
  }
}

function extractTargets(html) {
  const urls = [];

  // 只取正文：e-content 起、落款止（落款之後是留言與迴響區，非作者引用）
  const body = html.match(/class="body e-content"(.*?)<div class="signoff"/s);
  if (body) {
    urls.push(...[...body[1].matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"/g)].map((m) => m[1]));
  }

  // u-bridgy-fed 刻意放在正文之外（版面上不該出現），所以單獨挑出來：
  // 通知 fed.brid.gy 可讓新文章立刻聯邦，不必等它輪詢 RSS。
  const bf = html.match(/<a[^>]+class="[^"]*u-bridgy-fed[^"]*"[^>]+href="([^"]+)"/);
  if (bf) urls.push(bf[1]);

  return [...new Set(urls.filter((u) => !isOwn(u)))];
}

/**
 * 是否為單篇文章。**不能只看 dt-published** —— 自從列表頁加了 h-feed，
 * 每則摘要也有 dt-published，列表頁與 tag 頁會被誤判為文章。
 * e-content（正文）只有單篇文章的版型才有，用它判定才精確。
 */
function isPost(html) {
  return html.includes('class="body e-content"');
}

function publishedAt(html) {
  const m = html.match(/class="dt-published"[^>]*datetime="([^"]+)"/);
  return m ? new Date(m[1]) : null;
}

/** 規格順序：先看 HTTP Link header，再看 HTML 的 link/a rel=webmention */
async function discoverEndpoint(target) {
  const ac = AbortSignal.timeout(TIMEOUT);
  let res;
  try {
    res = await fetch(target, { signal: ac, redirect: 'follow' });
  } catch {
    return null;
  }
  if (!res.ok) return null;

  for (const link of (res.headers.get('link') || '').split(',')) {
    const m = link.match(/<([^>]+)>\s*;[^,]*rel\s*=\s*"?[^"]*webmention/i);
    if (m) return new URL(m[1], res.url).href;
  }

  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('text/html')) return null;
  const html = await res.text();
  const m = html.match(/<(?:link|a)[^>]+rel="[^"]*webmention[^"]*"[^>]*>/i);
  if (!m) return null;
  const href = m[0].match(/href="([^"]*)"/i);
  return href ? new URL(href[1], res.url).href : null;
}

async function send(endpoint, source, target) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ source, target }).toString(),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    return { ok: res.status >= 200 && res.status < 300, status: res.status };
  } catch (e) {
    return { ok: false, status: e.name };
  }
}

// ---- 主流程 ----
let sent = {};
try {
  sent = JSON.parse(await readFile(STATE, 'utf8'));
} catch {
  // 首次執行沒有狀態檔，屬正常
}

const files = await postFiles(DIST);
const pairs = [];
let skippedOld = 0;

let posts = 0;
for (const f of files) {
  const html = await readFile(f, 'utf8');
  // 列表頁與 tag 頁同樣是 index.html，且加了 h-feed 後也有 dt-published，故以 e-content 判定
  if (!isPost(html)) continue;
  const pub = publishedAt(html);
  if (!pub) continue;
  posts++;
  if (pub < SINCE) {
    skippedOld++;
    continue;
  }
  const source = sourceUrl(f);
  for (const target of extractTargets(html)) {
    if (sent[`${source} -> ${target}`]) continue;
    pairs.push({ source, target });
  }
}

console.log(
  `文章 ${posts} 篇（掃過 ${files.length} 個 index.html）；早於 ${SINCE.toISOString().slice(0, 10)} 而跳過 ${skippedOld} 篇`,
);
console.log(`待處理的 (source, target) 配對：${pairs.length}${DRY ? '（dry-run）' : ''}`);

let ok = 0;
let noEndpoint = 0;
let failed = 0;

for (const { source, target } of pairs) {
  const endpoint = await discoverEndpoint(target);
  if (!endpoint) {
    noEndpoint++;
    continue;
  }
  if (DRY) {
    console.log(`  [dry] ${target} → ${endpoint}`);
    ok++;
    continue;
  }
  const r = await send(endpoint, source, target);
  if (r.ok) {
    sent[`${source} -> ${target}`] = new Date().toISOString();
    ok++;
    console.log(`  ✓ ${target} (${r.status})`);
  } else {
    failed++;
    console.log(`  ✗ ${target} (${r.status})`);
  }
}

console.log(`結果：送出 ${ok}、無 webmention 端點 ${noEndpoint}、失敗 ${failed}`);
if (!DRY) await writeFile(STATE, JSON.stringify(sent, null, 2));
