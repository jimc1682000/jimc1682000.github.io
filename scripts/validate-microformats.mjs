#!/usr/bin/env node
// microformats2 驗證 gate。
//
// 為什麼需要：mf2 是**語意 class**，刪掉不會有任何錯誤、版面也不變，只會安靜地
// 讓 webmention／Bridgy Fed／IndieWeb reader 解析不到身分與文章。本次開發中已實際
// 發生過一次同類 regression（加 h-feed 後列表頁也有了 dt-published，導致
// send-webmentions.mjs 誤判「哪些頁是文章」）。
//
// 這裡的斷言就是今天手動驗過、實際依賴的那幾項；跑在 build 之後，失敗即讓 CI 紅。
//
// 用法：node scripts/validate-microformats.mjs [--dist dist] [--site https://jimmychen.me]

import { readFile } from 'node:fs/promises';
import { mf2 } from 'microformats-parser';

const args = process.argv.slice(2);
const arg = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d;
};
const DIST = arg('dist', 'dist');
const SITE = arg('site', 'https://jimmychen.me').replace(/\/$/, '');

const failures = [];
const checks = [];

function expect(label, cond, detail = '') {
  checks.push({ label, ok: Boolean(cond), detail });
  if (!cond) failures.push(`${label}${detail ? ` — ${detail}` : ''}`);
}

/** 只在對應的 gating 變數有設時才斷言：本機 build 常不帶 env，否則會假紅 */
function expectIfEnabled(envVar, label, cond, detail = '') {
  if (!process.env[envVar]) {
    checks.push({ label, ok: true, detail: `略過：${envVar} 未設` });
    return;
  }
  expect(label, cond, detail);
}

async function parse(file, url) {
  const html = await readFile(`${DIST}/${file}`, 'utf8');
  return mf2(html, { baseUrl: `${SITE}${url}` });
}

const findAll = (items, type) => items.filter((i) => i.type?.includes(type));
const has = (obj, ...keys) => keys.every((k) => Array.isArray(obj?.[k]) && obj[k].length > 0);

// ---- 1. 首頁的 representative h-card ----
// rel=me 驗證、Bridgy Fed 的 profile 與頭像都靠它。
{
  const r = await parse('index.html', '/');
  const cards = findAll(r.items, 'h-card');
  expect('首頁有 h-card', cards.length >= 1, `找到 ${cards.length} 個`);
  const p = cards[0]?.properties ?? {};
  expect('首頁 h-card 有 name', has(p, 'name'));
  expect('首頁 h-card 有 url', has(p, 'url'));
  expect('首頁 h-card 有 photo（缺了 fediverse 頭像會退回 favicon）', has(p, 'photo'));
  // fediverse handle 的 local part 由 acct: 形式的 u-url 決定；沒有它會變成
  // @jimmychen.me@jimmychen.me（網域重複）
  expect(
    '首頁 h-card 含 acct: 形式的 u-url（決定 fediverse handle）',
    (p.url ?? []).some((u) => String(u).startsWith('acct:')),
    JSON.stringify(p.url),
  );
  expect('首頁有 rel=me', (r.rels?.me ?? []).length >= 1, `${(r.rels?.me ?? []).length} 個`);
  // rel=webmention 由 PUBLIC_WEBMENTION_DOMAIN gating，CI 有設、本機常沒設
  expectIfEnabled(
    'PUBLIC_WEBMENTION_DOMAIN',
    '首頁宣告 webmention endpoint',
    (r.rels?.webmention ?? []).length >= 1,
  );
  expect(
    '首頁宣告 IndieAuth authorization_endpoint',
    (r.rels?.authorization_endpoint ?? []).length >= 1,
  );
}

// ---- 2. 文章的 h-entry ----
{
  const r = await parse('blog/claude-code/index.html', '/blog/claude-code/');
  const entries = findAll(r.items, 'h-entry');
  expect('文章頁有 h-entry', entries.length >= 1, `找到 ${entries.length} 個`);
  const p = entries[0]?.properties ?? {};
  expect('h-entry 有 name（標題）', has(p, 'name'));
  expect('h-entry 有 published（dt-published）', has(p, 'published'));
  expect('h-entry 有 content（e-content，webmention 驗證與聯邦都讀它）', has(p, 'content'));
  expect('h-entry 有 author（p-author h-card）', has(p, 'author'));
  expect('h-entry 有 url（u-url）', has(p, 'url'));
  expect('h-entry 有 category（p-category 標籤）', has(p, 'category'));
}

// ---- 3. 文章的 Bridgy Fed 即時聯邦標記（只該在繁中版）----
{
  const zh = await readFile(`${DIST}/blog/claude-code/index.html`, 'utf8');
  const en = await readFile(`${DIST}/en/blog/claude-code/index.html`, 'utf8');
  expect('繁中文章有 u-bridgy-fed（觸發即時聯邦）', zh.includes('u-bridgy-fed'));
  expect(
    '英文文章沒有 u-bridgy-fed（否則同一篇會聯邦兩次）',
    !en.includes('u-bridgy-fed'),
  );
}

// ---- 4. blog 列表的 h-feed ----
{
  const r = await parse('blog/index.html', '/blog/');
  const feeds = findAll(r.items, 'h-feed');
  expect('/blog/ 有 h-feed', feeds.length >= 1, `找到 ${feeds.length} 個`);
  const children = feeds[0]?.children ?? [];
  expect('h-feed 有 h-entry 子項', children.length > 0, `${children.length} 個`);
  const p = children[0]?.properties ?? {};
  expect('h-feed 子項有 name 與 published', has(p, 'name', 'published'));
  expect('h-feed 子項有 url', has(p, 'url'));
}

// ---- 5. 名片頁的 h-card ----
{
  const r = await parse('contact/index.html', '/contact/');
  const cards = findAll(r.items, 'h-card');
  expect('名片頁有 h-card', cards.length >= 1);
  const p = cards[0]?.properties ?? {};
  expect('名片 h-card 有 email（u-email）', has(p, 'email'));
  expect('名片 h-card 有 job-title', has(p, 'job-title'));
  expect('名片 h-card 有 photo', has(p, 'photo'));
}

// ---- 輸出 ----
for (const c of checks) console.log(`  ${c.ok ? '✓' : '✗'} ${c.label}${c.detail ? `  (${c.detail})` : ''}`);
console.log(`\nmicroformats 驗證：${checks.length - failures.length}/${checks.length} 通過`);
if (failures.length) {
  console.error('\n失敗項目：');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
