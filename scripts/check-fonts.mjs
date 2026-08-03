#!/usr/bin/env node
// postbuild gate：確認標題用到的每個字都在 subset 裡。
// 缺字的後果是那個字掉到系統黑體、同一行出現兩種字面，而且**不會有任何錯誤訊息**。
// 這支就是把那個靜默失敗變成 build 失敗。純 Node，CI（Node-only）跑得動。
import { readFileSync, existsSync } from 'node:fs';
import { headingChars } from './lib/site-chars.mjs';

const GEN = 'src/generated/fonts.json';
if (!existsSync(GEN)) {
  console.error(`✗ 找不到 ${GEN} —— 請先跑 npm run build:fonts`);
  process.exit(1);
}
const { faces, charset } = JSON.parse(readFileSync(GEN, 'utf8'));

// manifest 指到的檔案要真的在。只比對字集會漏掉「fonts.json 指著已不存在的檔名」這種狀態
// （build:fonts 中途失敗、或 rebase 時只留下一半產物）—— 那會讓 @font-face 抓到 404，
// 畫面靜默掉回系統字，而字集對帳照樣綠燈。
const absent = faces.map((f) => `public/fonts/${f.file}`).filter((p) => !existsSync(p));
if (absent.length) {
  console.error(`\n✗ ${GEN} 指到不存在的字型檔：\n`);
  for (const p of absent) console.error(`  ${p}`);
  console.error('\n修法：npm run build:fonts（會重新產生產物與 manifest）\n');
  process.exit(1);
}

const covered = new Set(charset);
const missing = [...headingChars()].filter((c) => !covered.has(c));

if (missing.length) {
  console.error(`\n✗ 標題字型 subset 缺 ${missing.length} 個字，它們會掉到系統黑體：\n`);
  console.error(`  ${missing.join(' ')}\n`);
  console.error(
    '修法：npm run build:fonts → npm run build → commit public/fonts 與 src/generated/fonts.json\n',
  );
  process.exit(1);
}
console.log(`✓ 標題字型覆蓋 ${covered.size} 個字（${faces.length} 個 face）`);
