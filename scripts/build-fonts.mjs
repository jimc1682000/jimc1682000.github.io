#!/usr/bin/env node
// 自 host webfont 的產生器：把 OFL 原檔 subset 成本站實際用到的字，輸出 woff2 到 public/fonts/。
//
//   node scripts/build-fonts.mjs
//
// 為什麼要 subset：思源宋體 TC 原檔單一字重 23 MB（兩萬多字），本站只用到約 1600 字。
// 實測 subset 後 371 KB。詳見 DESIGN.md Decisions Log。
//
// 為什麼產物 commit 進 repo（而不是 CI 產）：
//   - CI 是 Node-only，pyftsubset 是 Python，會多一層依賴
//   - 原檔 41 MB 不進 git，CI 要嘛每次下載（慢且依賴外部路徑穩定）要嘛也 commit（更大）
//   - fontTools 版本一變輸出位元組就變 → 檔名 hash 變 → 訪客快取全失效
// 代價是「新增內容用到新字時要記得重跑」，由 scripts/check-fonts.mjs 在 postbuild 擋掉。
//
// 原檔請自行放到 fonts-src/（已 gitignore），來源見 SOURCES。
// 依賴：uv（跑 fontTools + brotli，不進 npm）。

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { perPageChars } from './lib/site-chars.mjs';

const SRC_DIR = 'fonts-src';
const OUT_DIR = 'public/fonts';
const GEN_FILE = 'src/generated/fonts.json';

const SOURCES = {
  'NotoSerifCJKtc-Regular.otf':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/OTF/TraditionalChinese/NotoSerifCJKtc-Regular.otf',
  'NotoSerifCJKtc-Bold.otf':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/OTF/TraditionalChinese/NotoSerifCJKtc-Bold.otf',
  'NotoSansCJKtc-Regular.otf':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/OTF/TraditionalChinese/NotoSansCJKtc-Regular.otf',
  'NotoSansCJKtc-Medium.otf':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/OTF/TraditionalChinese/NotoSansCJKtc-Medium.otf',
  'NotoSansMono.ttf':
    'https://raw.githubusercontent.com/google/fonts/main/ofl/notosansmono/NotoSansMono%5Bwdth%2Cwght%5D.ttf',
  'LICENSE-NotoSerifCJK.txt':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/LICENSE',
  'LICENSE-NotoSansCJK.txt':
    'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/LICENSE',
  'LICENSE-NotoSansMono.txt':
    'https://raw.githubusercontent.com/google/fonts/main/ofl/notosansmono/OFL.txt',
};

// CJK 是全角等寬，vert/vrt2 給首頁的直式立軸用，其餘 layout feature 對本站沒用。
// 刻意不加 --desubroutinize：對 CFF 字型會讓檔案變大（實測 449 KB → 881 KB）。
const SUBSET_FLAGS = ['--layout-features=kern,vert,vrt2', '--no-hinting', '--flavor=woff2'];

const FACES = [
  { family: 'Noto Serif TC', weight: 400, src: 'NotoSerifCJKtc-Regular.otf', split: true },
  { family: 'Noto Serif TC', weight: 700, src: 'NotoSerifCJKtc-Bold.otf', split: true },
  { family: 'Noto Sans TC', weight: 400, src: 'NotoSansCJKtc-Regular.otf', split: true },
  { family: 'Noto Sans TC', weight: 500, src: 'NotoSansCJKtc-Medium.otf', split: true },
  // mono 是可變字型，預設 instance 就是 Regular(400)，我們也只用 400，不另外抽取字重軸。
  { family: 'Noto Sans Mono', weight: 400, src: 'NotoSansMono.ttf', split: false },
];

// core 之外的 CJK 走這個寬範圍。刻意寫得短：unicode-range 字串會 inline 進每一頁的
// <head>，逐一列出 1400 個碼位要 9.3 KB／face。實測「兩個 face 都涵蓋同一字時，後宣告
// 的贏且前者完全不下載」，所以大檔用寬範圍先宣告、小檔用精確範圍後宣告，效果相同。
const CJK_BLOCKS =
  'U+2E80-2FFF,U+3000-303F,U+3100-312F,U+3190-31EF,U+3400-4DBF,U+4E00-9FFF,U+F900-FAFF,U+FE30-FE4F,U+FF00-FFEF,U+20000-2FA1F';

// 把碼位壓成連續區間，避免 unicode-range 字串過長。
function toRanges(chars) {
  const cps = [...chars].map((c) => c.codePointAt(0)).sort((a, b) => a - b);
  const out = [];
  let start = cps[0];
  let prev = cps[0];
  for (const cp of cps.slice(1)) {
    if (cp === prev + 1) {
      prev = cp;
      continue;
    }
    out.push([start, prev]);
    start = prev = cp;
  }
  out.push([start, prev]);
  return out
    .map(([a, b]) =>
      a === b
        ? `U+${a.toString(16).toUpperCase()}`
        : `U+${a.toString(16).toUpperCase()}-${b.toString(16).toUpperCase()}`,
    )
    .join(',');
}

// ---------- subset ----------

function pyftsubset(src, chars, outPath) {
  const listFile = join(OUT_DIR, '.charlist.tmp');
  writeFileSync(listFile, [...chars].join(''), 'utf8');
  const args = [
    'run',
    '--quiet',
    '--with',
    'fonttools',
    '--with',
    'brotli',
    'pyftsubset',
    src,
    `--text-file=${listFile}`,
    `--output-file=${outPath}`,
    ...SUBSET_FLAGS,
  ];
  try {
    execFileSync('uv', args, { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (err) {
    throw new Error(`pyftsubset 失敗（${src}）：${String(err.stderr ?? err)}`, { cause: err });
  }
  rmSync(listFile);
}

// ---------- main ----------

const missing = Object.keys(SOURCES).filter((f) => !existsSync(join(SRC_DIR, f)));
if (missing.length) {
  console.error(`缺少字型原檔，請放到 ${SRC_DIR}/（已 gitignore）：\n`);
  for (const f of missing) console.error(`  ${f}\n    ${SOURCES[f]}`);
  console.error('\n（原檔約 84 MB，刻意不進 git；授權檔會被複製到 public/fonts/）');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync('src/generated', { recursive: true });
for (const old of existsSync(OUT_DIR) ? readdirSync(OUT_DIR) : []) {
  if (old.endsWith('.woff2') || old.startsWith('LICENSE-')) rmSync(join(OUT_DIR, old));
}

// 方案 B：core（全站共用）+ 每頁 delta。core 抓一次進快取，delta 只有該頁會抓。
// 對照方案 C（全站共用單檔）：C 等於把所有頁的 delta 全塞進 core，訪客第一頁就付全站的帳。
const { core, deltas } = perPageChars();
const totalCJK = new Set([...deltas.values()].flatMap((s) => [...s]));
console.log(
  `core ${core.size} 字（全站共用）／各頁 delta 合計 ${totalCJK.size} 個不同中文字，共 ${deltas.size} 頁`,
);

const CORE_RANGE = `U+0-2E7F,${toRanges([...core].filter((c) => c.codePointAt(0) >= 0x2e80))}`;
const SPLIT_FACES = FACES.filter((f) => f.split);
const coreFaces = [];
const pageFaces = {};
let deltaBytes = 0;

function emit(face, chars, tier, range) {
  const tmp = join(OUT_DIR, 'tmp.woff2');
  pyftsubset(join(SRC_DIR, face.src), chars, tmp);
  const buf = readFileSync(tmp);
  const hash = createHash('sha256').update(buf).digest('hex').slice(0, 8);
  const slug = `${face.family.toLowerCase().replace(/ /g, '-')}-${face.weight}-${tier}`;
  const file = `${slug}.${hash}.woff2`;
  writeFileSync(join(OUT_DIR, file), buf);
  rmSync(tmp);
  return {
    entry: { family: face.family, weight: face.weight, file, unicodeRange: range },
    size: buf.length,
  };
}

// core：含 mono（mono 只有拉丁，不分頁）
for (const face of FACES) {
  const chars = face.split ? core : new Set([...core].filter((c) => c.codePointAt(0) < 0x2e80));
  const range = face.split ? CORE_RANGE : 'U+0-2E7F';
  const { entry, size } = emit(face, chars, 'core', range);
  coreFaces.push(entry);
  console.log(`  core  ${entry.file}  ${(size / 1024).toFixed(1)} KB`);
}

// 每頁 delta。空 delta 的頁面（純英文頁、列表頁）不產檔。
for (const [route, chars] of deltas) {
  if (chars.size === 0) continue;
  const list = [];
  for (const face of SPLIT_FACES) {
    // delta 用寬 CJK 範圍宣告在前、core 用精確範圍在後 —— 兩者都涵蓋某字時後宣告者贏
    // 且前者不下載（已實測 document.fonts status）。
    const { entry, size } = emit(
      face,
      chars,
      `d${createHash('sha1').update(route).digest('hex').slice(0, 6)}`,
      CJK_BLOCKS,
    );
    list.push(entry);
    deltaBytes += size;
  }
  pageFaces[route] = list;
}
console.log(
  `\n每頁 delta：${Object.keys(pageFaces).length} 頁有檔，合計 ${(deltaBytes / 1024 / 1024).toFixed(2)} MB`,
);

for (const lic of Object.keys(SOURCES).filter((f) => f.startsWith('LICENSE-'))) {
  writeFileSync(join(OUT_DIR, lic), readFileSync(join(SRC_DIR, lic)));
}

// charset 一起寫出來給 scripts/check-fonts.mjs 對帳（純文字比對，CI 不需要 Python）。
writeFileSync(
  GEN_FILE,
  `${JSON.stringify({ coreFaces, pageFaces, charset: { core: [...core].sort().join('') }, deltaCharsByRoute: Object.fromEntries([...deltas].filter(([, s]) => s.size).map(([r, s]) => [r, [...s].sort().join('')])) }, null, 2)}\n`,
  'utf8',
);
execFileSync('npx', ['prettier', '--write', GEN_FILE], { stdio: 'ignore' });
console.log(
  `已寫入 ${GEN_FILE}（core ${coreFaces.length} 個 face + ${Object.keys(pageFaces).length} 頁 delta）與三份 OFL 授權`,
);
