// 從 dist/ 的產出 HTML 抽出「本站實際會顯示的字元」。
// build-fonts.mjs（產生 subset）與 check-fonts.mjs（postbuild 對帳）共用這支，
// 兩邊用同一套抽法才不會一邊漏字、另一邊放行。
//
// 為什麼看 dist 而不是 content/：dist 才包含 i18n UI 字串、日期格式、tag 名稱、
// 作品集與履歷資料等 runtime 產生的文字。從 content/ 掃會漏。
//
// 但 dist 也有它漏的東西：**條件式渲染的標題**。例如 Webmentions.astro 的
// `<h2>{t('webmention.title')}</h2>` 只在 PUBLIC_WEBMENTION_DOMAIN 有設、且該篇真的
// 收到迴響時才出現 —— 本機沒設就掃不到那幾個字，CI 有設就會在 postbuild 掛掉、擋住部署。
// 故除了掃 dist，另外從原始碼靜態抽出「出現在標題位置的 i18n key」並收進字集。

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function filesWithExt(dir, ext, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) filesWithExt(p, ext, out);
    else if (p.endsWith(ext)) out.push(p);
  }
  return out;
}

const htmlFiles = (dir = 'dist') => filesWithExt(dir, '.html');

const I18N_FILE = 'src/i18n/ui.ts';

/**
 * 出現在標題位置的 i18n 字串。掃原始碼而不是 dist，因為有些標題是條件式渲染的
 * （見檔頭說明）。新增一個 `<h2>{t('x')}</h2>` 會自動被收進來，不必手動維護清單；
 * key 在 ui.ts 找不到就直接爆掉（寧可 build 失敗，不要靜默缺字）。
 */
function i18nHeadingChars(srcDir = 'src') {
  const ui = readFileSync(join(srcDir, 'i18n/ui.ts'), 'utf8');
  const values = new Map();
  for (const m of ui.matchAll(/'([\w.]+)':\s*'((?:[^'\\]|\\.)*)'/g)) {
    if (!values.has(m[1])) values.set(m[1], []);
    values.get(m[1]).push(m[2]);
  }

  const keys = new Set();
  const HEADING_SOURCE = [
    /<(h[1-4])\b[^>]*>([\s\S]*?)<\/\1>/gi,
    /<[^>]*class="[^"]*\b(?:pt|page-h|brand|slogan|t)\b[^"]*"[^>]*>([\s\S]*?)<\//gi,
  ];
  for (const f of filesWithExt(srcDir, '.astro')) {
    const src = readFileSync(f, 'utf8');
    for (const re of HEADING_SOURCE) {
      for (const m of src.matchAll(re)) {
        for (const k of (m[2] ?? m[1]).matchAll(/\bt\('([\w.]+)'\)/g)) keys.add(k[1]);
      }
    }
  }

  const out = new Set();
  for (const key of keys) {
    const vals = values.get(key);
    if (!vals) throw new Error(`${I18N_FILE} 找不到標題用的 i18n key：${key}`);
    for (const v of vals) for (const c of printable(v)) out.add(c);
  }
  return out;
}

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
  copy: '©',
  reg: '®',
  deg: '°',
};

// entity 必須「解碼」而不是刪掉：`&lt;` 在畫面上是 `<`，那個字形需要進 subset。
// 早期版本直接把 entity 換成空白，導致 code 區塊的 < > & 缺字而 gate 照樣放行
// —— 那正是這支 gate 該抓到的靜默失敗（Codex review 抓到，PR #44）。
function decodeEntities(s) {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, body) => {
    if (body[0] === '#') {
      const cp =
        body[1] === 'x' || body[1] === 'X'
          ? parseInt(body.slice(2), 16)
          : parseInt(body.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : ' ';
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? ' ';
  });
}

function visibleText(html) {
  const stripped = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return decodeEntities(stripped);
}

const printable = (s) => [...s].filter((c) => c.trim() !== '');

/**
 * @returns {{all:Set<string>, core:Set<string>, rest:Set<string>, enOnly:Set<string>}}
 *   core = 非 CJK 全部 + 英文頁面會出現的 CJK（站名、人名、標題裡的中文）
 *   rest = 只有中文頁面才會用到的 CJK
 */
/**
 * 標題實際會用到的字。思源黑體 webfont 只給這些位置用，所以字集比全站小得多。
 *
 * 涵蓋的位置：
 *   h1–h4          — 文章標題（.page-h 是 h1，一併收）
 *   .pt            — 列表頁的文章標題（div，不是 heading，容易漏）
 *   .item .t       — 作品集的條目標題（同樣是 div）
 *   .slogan        — 首頁直式立軸的標語（姓名已移除，見 Home.astro）
 *   .brand         — Header 的站名
 *   strong、b      — 已不吃這個 face（正文是系統黑體），但留著多收：字集寬一點只多幾 KB，
 *                    窄了則是畫面缺字。
 * 漏掉任何一處的後果是那些字掉到系統黑體，同一行兩種字面，且不會報錯 —— 故有 gate。
 *
 * 反向也要顧：CSS 接上 webfont 的選擇器必須是這裡掃到的**子集**。多接（例如 h5/h6）
 * 就是靜默缺字，而 gate 只查這個方向的缺口，抓不到。對帳只需看一處 ——
 * src/styles/global.css 裡那條「標題字型的唯一接點」規則。
 */
export function headingChars(distDir = 'dist') {
  const files = htmlFiles(distDir);
  if (files.length === 0) throw new Error(`${distDir}/ 沒有 HTML —— 請先跑 npm run build`);

  const out = new Set();
  const PATTERNS = [
    /<(h1|h2|h3|h4)\b[^>]*>([\s\S]*?)<\/\1>/gi,
    /<div[^>]*class="[^"]*\bpt\b[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]*class="[^"]*\bt\b[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<div[^>]*class="[^"]*\bslogan\b[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    /<[^>]*class="[^"]*\bpage-h\b[^"]*"[^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi,
    /<a[^>]*class="[^"]*\bbrand\b[^"]*"[^>]*>([\s\S]*?)<\/a>/gi,
  ];
  for (const f of files) {
    const html = readFileSync(f, 'utf8').replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ');
    for (const re of PATTERNS) {
      for (const m of html.matchAll(re)) {
        const inner = m[2] ?? m[1];
        for (const c of printable(visibleText(inner))) out.add(c);
      }
    }
  }
  // 條件式渲染的標題（webmention 區塊等）：從原始碼補，dist 掃不到。
  for (const c of i18nHeadingChars()) out.add(c);
  // 可見 ASCII 全收：拉丁字形極小，寧可多收也不要因抽取邏輯有漏就掉字。
  for (let cp = 0x21; cp < 0x7f; cp++) out.add(String.fromCodePoint(cp));
  for (const c of '０１２３４５６７８９年月日') out.add(c);
  return out;
}
