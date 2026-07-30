#!/usr/bin/env node
// postbuild gate：確認 dist/ 會顯示的每個字都在 subset 裡。
//
// 為什麼需要：subset 產物是 commit 進 repo 的（見 build-fonts.mjs 頂端說明），
// 所以新增內容用到新字時不會自動更新。少一個字的後果是那個字掉到系統字型顯示
// —— 同一行出現兩種字面，而且**不會有任何錯誤訊息**。這支就是把那個靜默失敗
// 變成 build 失敗。
//
// 純 Node、零 Python 依賴，所以 CI（Node-only）跑得動。
// 失敗時的修法：把字型原檔放回 fonts-src/，跑 node scripts/build-fonts.mjs，再 build 一次。

import { readFileSync, existsSync } from 'node:fs';
import { perPageChars } from './lib/site-chars.mjs';

const GEN = 'src/generated/fonts.json';

if (!existsSync(GEN)) {
  console.error(`✗ 找不到 ${GEN} —— 請先跑 node scripts/build-fonts.mjs`);
  process.exit(1);
}

const gen = JSON.parse(readFileSync(GEN, 'utf8'));
const coreSet = new Set(gen.charset.core);

// 逐頁檢查：每一頁顯示的字，必須落在 core 或「該頁自己的 delta」裡。
// 這比全站聯集檢查嚴格 —— 每頁一個子集的做法下，字在別頁的 delta 裡不算覆蓋到。
const { core, deltas } = perPageChars();
const problems = [];
for (const [route, chars] of deltas) {
  const declared = new Set(gen.deltaCharsByRoute?.[route] ?? '');
  const missing = [...chars].filter((c) => !coreSet.has(c) && !declared.has(c));
  if (missing.length) problems.push([route, missing]);
}
const coreMissing = [...core].filter((c) => !coreSet.has(c));

if (coreMissing.length || problems.length) {
  console.error('\n✗ 字型 subset 沒覆蓋到以下字，它們會掉到系統字型：\n');
  if (coreMissing.length)
    console.error(`  core 缺 ${coreMissing.length} 個：${coreMissing.join(' ')}`);
  for (const [route, m] of problems.slice(0, 10))
    console.error(`  ${route} 缺 ${m.length} 個：${m.join('')}`);
  if (problems.length > 10) console.error(`  …另有 ${problems.length - 10} 頁`);
  console.error(
    '\n修法：node scripts/build-fonts.mjs → npm run build → commit public/fonts 與 src/generated/fonts.json\n',
  );
  process.exit(1);
}

console.log(
  `✓ 每頁子集覆蓋完整：core ${coreSet.size} 字（${gen.coreFaces.length} 個 face）+ ${Object.keys(gen.pageFaces).length} 頁 delta`,
);
