#!/usr/bin/env node
// 標題用的自 host webfont：把思源黑體 TC subset 成「只有標題會用到的字」。
//
//   npm run build && npm run build:fonts && npm run build
//
// 為什麼標題要自 host：系統黑體長得各家不同（macOS PingFang、Windows 微軟正黑），
// 標題是版面最顯眼的地方，交給系統字等於放棄跨平台一致性。思源黑體 TC 兩邊都不內建，
// 只能自己送。但正文用中文 webfont 要付幾百 KB（實測全站字集 371 KB／字重），效能代價
// 太大，故正文仍是系統黑體。標題字少，實測約 420 字、每字重 60 KB 級別。
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

// 換標題字型只改這個物件。family 會寫進 src/generated/fonts.json，由 BaseHead.astro
// 讀去產 @font-face —— 字面值只存在這裡一份，不必兩邊手抄（global.css 的
// --font-heading 是第三處，但那是 CSS 端的 token，無法從 JS 匯入）。
const FONT = {
  family: 'NotoSansTC Head',
  filePrefix: 'noto-sans-tc',
  license: 'LICENSE-NotoSansCJK.txt',
  urlBase: 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans',
  faces: [
    { weight: 400, src: 'NotoSansCJKtc-Regular.otf' },
    { weight: 700, src: 'NotoSansCJKtc-Bold.otf' },
  ],
};

const SOURCES = {
  ...Object.fromEntries(
    FONT.faces.map((f) => [f.src, `${FONT.urlBase}/OTF/TraditionalChinese/${f.src}`]),
  ),
  [FONT.license]: `${FONT.urlBase}/LICENSE`,
};

// chws／halt 是標點擠壓要用的：瀏覽器的 text-spacing-trim（初始值就是 normal，CSS 端
// 不必宣告）會把「」（）。 這類全形標點的多餘字身吃掉，但**字型沒有 chws 或 halt 時
// 該功能直接停用**（MDN 明載）。標題含逗號與引號（站名「吉光聚斂，米粒成章」就是），
// 所以 subset 要留著它們。實測這份原檔只有 halt（GPOS）、沒有 chws —— chws 是後來
// 才加進思源系列的，一併列著讓日後換版本不必再改一次；pyftsubset 對不存在的 feature
// 直接忽略。驗證方式：TTFont(產物).GPOS 的 FeatureTag 應含 halt（實測 +0.1 KB）。
// 不帶 vert/vrt2：首頁直式立軸吃的是 --font-prose（系統宋體），這個 face 沒有直排位置。
// 刻意不加 --desubroutinize（對 CFF 反而變大，實測 449→881 KB）。
const FLAGS = ['--layout-features=kern,chws,halt', '--no-hinting', '--flavor=woff2'];

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
console.log(`標題用字 ${chars.size} 個`);

const listFile = join(OUT_DIR, '.charlist.tmp');
writeFileSync(listFile, [...chars].join(''), 'utf8');
const faces = [];
for (const face of FONT.faces) {
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
  const file = `${FONT.filePrefix}-${face.weight}.${hash}.woff2`;
  writeFileSync(join(OUT_DIR, file), buf);
  rmSync(tmp);
  faces.push({ weight: face.weight, file });
  console.log(`  ${file}  ${(buf.length / 1024).toFixed(1)} KB`);
}
rmSync(listFile);
writeFileSync(join(OUT_DIR, FONT.license), readFileSync(join(SRC_DIR, FONT.license)));
writeFileSync(
  GEN_FILE,
  `${JSON.stringify({ family: FONT.family, faces, charset: [...chars].sort().join('') }, null, 2)}\n`,
  'utf8',
);
execFileSync('npx', ['prettier', '--write', GEN_FILE], { stdio: 'ignore' });
console.log(`已寫入 ${GEN_FILE} 與 OFL 授權`);
