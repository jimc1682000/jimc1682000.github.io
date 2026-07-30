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

function visibleText(html) {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, ' ');
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

  // Astro 會依 locale 產生日期字串，某些月份/數字組合當下的產物可能沒出現，
  // 補進基線避免下個月換月就缺字。
  for (const c of '0123456789０１２３４５６７８９年月日') {
    all.add(c);
    onEnPages.add(c);
  }

  const core = new Set([...all].filter((c) => !isCJK(c) || onEnPages.has(c)));
  const rest = new Set([...all].filter((c) => !core.has(c)));
  return { all, core, rest, enOnly: onEnPages };
}
