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
import { siteChars, isCJK } from './lib/site-chars.mjs';

const GEN = 'src/generated/fonts.json';

if (!existsSync(GEN)) {
  console.error(`✗ 找不到 ${GEN} —— 請先跑 node scripts/build-fonts.mjs`);
  process.exit(1);
}

const { faces, charset } = JSON.parse(readFileSync(GEN, 'utf8'));
const covered = new Set([...charset.core, ...charset.rest]);
const coreSet = new Set(charset.core);

const { all, core } = siteChars();

const missing = [...all].filter((c) => !covered.has(c));
// core 是「英文頁面也會用到的字」。少收不會缺字（只是英文頁多抓 rest 大檔），
// 所以只當警告，不擋 build。
const notInCore = [...core].filter((c) => isCJK(c) && !coreSet.has(c));

const fileList = faces.map((f) => `${f.file}`).join('\n  ');

if (missing.length) {
  console.error(`\n✗ 字型 subset 缺 ${missing.length} 個字，它們會掉到系統字型：\n`);
  console.error(`  ${missing.join(' ')}\n`);
  console.error('修法：');
  console.error('  1. 把原檔放回 fonts-src/（缺檔時 build-fonts.mjs 會印下載網址）');
  console.error('  2. node scripts/build-fonts.mjs');
  console.error('  3. npm run build（讓新的檔名 hash 進到頁面）');
  console.error('  4. 把 public/fonts/ 與 src/generated/fonts.json 一起 commit\n');
  process.exit(1);
}

if (notInCore.length) {
  console.warn(
    `⚠ 有 ${notInCore.length} 個中文字出現在英文頁面但不在 core：${notInCore.join('')}\n` +
      '  英文頁會因此多抓 rest 大檔（只影響速度，不缺字）。重跑 build-fonts.mjs 可修正。',
  );
}

console.log(
  `✓ 字型 subset 覆蓋 dist/ 的 ${all.size} 個字元（${faces.length} 個 face）\n  ${fileList}`,
);
