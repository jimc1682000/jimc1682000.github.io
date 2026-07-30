#!/usr/bin/env node
// postbuild gate：確認標題與粗體用到的每個字都在 subset 裡。
// 缺字的後果是那個字掉到系統宋體、同一行出現兩種字面，而且**不會有任何錯誤訊息**。
// 這支就是把那個靜默失敗變成 build 失敗。純 Node，CI（Node-only）跑得動。
import { readFileSync, existsSync } from 'node:fs';
import { headingChars } from './lib/site-chars.mjs';

const GEN = 'src/generated/fonts.json';
if (!existsSync(GEN)) {
  console.error(`✗ 找不到 ${GEN} —— 請先跑 npm run build:fonts`);
  process.exit(1);
}
const { faces, charset } = JSON.parse(readFileSync(GEN, 'utf8'));
const covered = new Set(charset);
const missing = [...headingChars()].filter((c) => !covered.has(c));

if (missing.length) {
  console.error(`\n✗ 標題字型 subset 缺 ${missing.length} 個字，它們會掉到系統宋體：\n`);
  console.error(`  ${missing.join(' ')}\n`);
  console.error(
    '修法：npm run build:fonts → npm run build → commit public/fonts 與 src/generated/fonts.json\n',
  );
  process.exit(1);
}
console.log(`✓ 標題字型覆蓋 ${covered.size} 個字（${faces.length} 個 face）`);
