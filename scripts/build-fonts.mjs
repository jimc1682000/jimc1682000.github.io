#!/usr/bin/env node
// 標題用的自 host webfont：把思源宋體 subset 成「只有標題與粗體會用到的字」。
//
//   npm run build && npm run build:fonts && npm run build
//
// 為什麼只做標題：思源宋體不是任何主流系統的內建字型，而各系統的宋體（macOS Songti、
// Windows 新細明體）粗體都偏輕 —— 那是原本「粗體不明顯」的根因。但正文用中文 webfont
// 要付幾百 KB（實測全站字集 371 KB／字重），效能代價太大，故正文改系統黑體。
// 標題字少，實測只需約 420 字、每字重 90 KB 級別。
//
// 為什麼產物 commit 進 repo：CI 是 Node-only 而 pyftsubset 是 Python；原檔 48 MB 不進
// git；工具版本變動會讓輸出 hash 漂掉、訪客快取全失效。代價由 check-fonts.mjs 擋掉。
//
// 原檔放 fonts-src/（已 gitignore），缺檔時本腳本會印下載網址。依賴 uv。

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { headingChars } from './lib/site-chars.mjs';

const SRC_DIR = 'fonts-src';
const OUT_DIR = 'public/fonts';
const GEN_FILE = 'src/generated/fonts.json';

const SOURCES = {
  'NotoSerifCJKtc-Regular.otf':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/OTF/TraditionalChinese/NotoSerifCJKtc-Regular.otf',
  'NotoSerifCJKtc-Bold.otf':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/OTF/TraditionalChinese/NotoSerifCJKtc-Bold.otf',
  'LICENSE-NotoSerifCJK.txt':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/LICENSE',
};

// vert/vrt2 給首頁的直式立軸；刻意不加 --desubroutinize（對 CFF 反而變大，實測 449→881 KB）。
const FLAGS = ['--layout-features=kern,vert,vrt2', '--no-hinting', '--flavor=woff2'];
const FACES = [
  { weight: 400, src: 'NotoSerifCJKtc-Regular.otf' },
  { weight: 700, src: 'NotoSerifCJKtc-Bold.otf' },
];

const missing = Object.keys(SOURCES).filter((f) => !existsSync(join(SRC_DIR, f)));
if (missing.length) {
  console.error(`缺少字型原檔，請放到 ${SRC_DIR}/（已 gitignore）：\n`);
  for (const f of missing) console.error(`  ${f}\n    ${SOURCES[f]}`);
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync('src/generated', { recursive: true });
for (const old of readdirSync(OUT_DIR)) {
  if (old.endsWith('.woff2') || old.startsWith('LICENSE-')) rmSync(join(OUT_DIR, old));
}

const chars = headingChars();
console.log(`標題與粗體用字 ${chars.size} 個`);

const listFile = join(OUT_DIR, '.charlist.tmp');
writeFileSync(listFile, [...chars].join(''), 'utf8');
const faces = [];
for (const face of FACES) {
  const tmp = join(OUT_DIR, 'tmp.woff2');
  try {
    execFileSync(
      'uv',
      [
        'run',
        '--quiet',
        '--with',
        'fonttools',
        '--with',
        'brotli',
        'pyftsubset',
        join(SRC_DIR, face.src),
        `--text-file=${listFile}`,
        `--output-file=${tmp}`,
        ...FLAGS,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'] },
    );
  } catch (err) {
    throw new Error(`pyftsubset 失敗（${face.src}）：${String(err.stderr ?? err)}`, { cause: err });
  }
  const buf = readFileSync(tmp);
  const hash = createHash('sha256').update(buf).digest('hex').slice(0, 8);
  const file = `noto-serif-tc-${face.weight}.${hash}.woff2`;
  writeFileSync(join(OUT_DIR, file), buf);
  rmSync(tmp);
  faces.push({ weight: face.weight, file });
  console.log(`  ${file}  ${(buf.length / 1024).toFixed(1)} KB`);
}
rmSync(listFile);
writeFileSync(
  join(OUT_DIR, 'LICENSE-NotoSerifCJK.txt'),
  readFileSync(join(SRC_DIR, 'LICENSE-NotoSerifCJK.txt')),
);
writeFileSync(
  GEN_FILE,
  `${JSON.stringify({ faces, charset: [...chars].sort().join('') }, null, 2)}\n`,
  'utf8',
);
execFileSync('npx', ['prettier', '--write', GEN_FILE], { stdio: 'ignore' });
console.log(`已寫入 ${GEN_FILE} 與 OFL 授權`);
