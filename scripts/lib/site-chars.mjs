// 從 dist/ 的產出 HTML 抽出「本站實際會顯示的字元」。
// build-fonts.mjs（產生 subset）與 check-fonts.mjs（postbuild 對帳）共用這支，
// 兩邊用同一套抽法才不會一邊漏字、另一邊放行。
//
// 為什麼看 dist 而不是 content/：dist 才包含 i18n UI 字串、日期格式、tag 名稱、
// 作品集與履歷資料等 runtime 產生的文字。從 content/ 掃會漏。

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const CJK_START = 0x2e80;
export const isCJK = (c) => c.codePointAt(0) >= CJK_START;

export function htmlFiles(dir = 'dist', out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) htmlFiles(p, out);
    else if (p.endsWith('.html')) out.push(p);
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
export function siteChars(distDir = 'dist') {
  const files = htmlFiles(distDir);
  if (files.length === 0) throw new Error(`${distDir}/ 沒有 HTML —— 請先跑 npm run build`);

  const all = new Set();
  const onEnPages = new Set();
  for (const f of files) {
    const chars = printable(visibleText(readFileSync(f, 'utf8')));
    for (const c of chars) all.add(c);
    if (f.includes(`${distDir}/en/`)) for (const c of chars) onEnPages.add(c);
  }

  // 基線：可見 ASCII 全收 + 日期用字。
  // ASCII 全收是**第二道防線** —— 拉丁字形極小（core 檔才 22 KB），寧可多收，
  // 也不要因為抽取邏輯漏了某個標點就在畫面上掉字。
  // 日期字串由 Astro 依 locale 在 runtime 產生，當下產物沒出現的月份下個月會出現。
  for (let cp = 0x21; cp < 0x7f; cp++) {
    all.add(String.fromCodePoint(cp));
    onEnPages.add(String.fromCodePoint(cp));
  }
  for (const c of '０１２３４５６７８９年月日') {
    all.add(c);
    onEnPages.add(c);
  }

  const core = new Set([...all].filter((c) => !isCJK(c) || onEnPages.has(c)));
  const rest = new Set([...all].filter((c) => !core.has(c)));
  return { all, core, rest, enOnly: onEnPages };
}
