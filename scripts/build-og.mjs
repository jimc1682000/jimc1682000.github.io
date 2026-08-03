#!/usr/bin/env node
// 從 public/*.svg 產出被實際引用的 PNG：og.png（og:image / twitter:image）與
// avatar.png（h-card u-photo、vCard PHOTO）。
//
//   npm run build:og
//
// 為什麼線上用 PNG 不用 SVG：SVG 裡的文字要靠**觀看端**有那個字型才畫得出來，
// 而社群平台的爬蟲與 fediverse 伺服器的字型環境不可控 —— 中文會變方框或空白。
// PNG 把字形烤進像素，任何地方看到的都一樣。SVG 只是來源，沒有任何頁面指向它。
//
// 為什麼不進 CI：ubuntu-latest 沒有中文字型，在 CI 產圖會**靜默**產出方框或空白。
// 故本腳本在本機跑、PNG commit 進 repo（同 build:fonts 的取捨）。
//
// 「靜默失敗」正是這裡的風險，所以每張圖都做像素斷言：指定區域必須真的有墨。
// 缺字型時該區域會是空白，斷言就會失敗 —— 而不是產出一張沒字的卡片還說成功。

import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

/** 一個斷言：在 [x0,x1)×[y0,y1) 內，符合 test 的像素至少要有 min 個。 */
const region = (name, x0, y0, x1, y1, test, min) => ({ name, x0, y0, x1, y1, test, min });

const isInk = (r) => r < 80; // 墨 #17191b
const isGrey = (r) => r < 160; // 次要文字 #666059
const isWhite = (r, g, b) => r > 240 && g > 240 && b > 240; // 印章白字

const TARGETS = [
  {
    svg: 'public/og.svg',
    png: 'public/og.png',
    width: 1200,
    height: 630,
    // 座標對齊 og.svg 裡各 <text> 的 x/y 與字級；印章取內縮框以內，避開米白外框線。
    checks: [
      region('印章「吉」白字', 118, 118, 190, 190, (r, g, b) => isWhite(r, g, b), 500),
      region('站名', 88, 285, 1112, 345, (r) => isInk(r), 3000),
      region('標語', 88, 378, 1112, 422, (r) => isGrey(r), 1000),
      region('署名', 88, 500, 700, 542, (r) => isInk(r), 800),
    ],
  },
  {
    svg: 'public/avatar.svg',
    png: 'public/avatar.png',
    width: 512,
    height: 512,
    checks: [region('印章「吉」白字', 90, 90, 420, 420, (r, g, b) => isWhite(r, g, b), 5000)],
  },
];

let failed = false;
const pending = [];
for (const t of TARGETS) {
  const buf = await sharp(readFileSync(t.svg))
    .resize(t.width, t.height)
    .png({ compressionLevel: 9 })
    .toBuffer();

  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  if (info.width !== t.width || info.height !== t.height) {
    console.error(`✗ ${t.png} 尺寸 ${info.width}×${info.height}，預期 ${t.width}×${t.height}`);
    failed = true;
    continue;
  }

  const lines = [];
  for (const c of t.checks) {
    let hit = 0;
    for (let y = c.y0; y < c.y1; y++) {
      for (let x = c.x0; x < c.x1; x++) {
        const i = (y * info.width + x) * info.channels;
        if (c.test(data[i], data[i + 1], data[i + 2])) hit++;
      }
    }
    const ok = hit >= c.min;
    if (!ok) failed = true;
    lines.push(`    ${ok ? '✓' : '✗'} ${c.name}：${hit} px（下限 ${c.min}）`);
  }

  console.log(`  ${t.png}  ${(buf.length / 1024).toFixed(1)} KB`);
  for (const l of lines) console.log(l);
  // 先收進 pending，全部通過才落地 —— 否則第一張過、第二張掛時，會留下一張新 og.png
  // 配一張舊 avatar.png，而訊息還說「未寫入」，很容易 commit 出不成對的產物。
  pending.push({ path: t.png, buf });
}

if (failed) {
  console.error(
    '\n✗ 像素斷言失敗，**所有 PNG 都未寫入**（避免產出不成對的圖）。常見原因：本機缺中文' +
      '字型，或 svg 的座標改了而本腳本的區域沒跟著改。修法：先確認 svg 在瀏覽器裡看起來' +
      '正常，再對齊區域座標。\n',
  );
  process.exit(1);
}
for (const { path, buf } of pending) writeFileSync(path, buf);
console.log('✓ og.png 與 avatar.png 已更新（記得一起 commit）');
