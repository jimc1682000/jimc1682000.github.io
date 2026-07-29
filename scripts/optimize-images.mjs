#!/usr/bin/env node
// 圖片內部化 / 壓縮標準工具（WebP q92）。
//
// 兩種用法：
//   1) 批次內部化 blog 外部圖（本次遷移用）：
//        node scripts/optimize-images.mjs --internalize
//      掃 content/blog/**/*.md 的外部圖 URL，優先用 Takeout Albums 本地全畫質原檔
//      （感知雜湊比對），否則下載；一律轉 WebP q92 → public/blog/img/，改寫 md（zh+en）。
//   2) 壓單一來源目錄的圖 → public/blog/img/：
//        node scripts/optimize-images.mjs <srcDir>
//
// 標準：WebP quality 92（見 DESIGN.md §8 / AGENTS.md）。來源多為已壓過的圖，
// q92 兼顧「文字截圖銳利」與「有感瘦身（~25%）」。
//
// 依賴：sharp（devDependency）。ALBUMS 路徑可用 --albums 覆寫。

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const QUALITY = 92;
const OUT_DIR = 'public/blog/img';
const PUBLIC_PREFIX = '/blog/img';
const args = process.argv.slice(2);
const albumsArg = valOf('--albums');
const ALBUMS = albumsArg ?? `${process.env.HOME}/workdir/blogger/Takeout/Blogger/Albums`;

function valOf(flag) {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : undefined;
}

// --- dHash（8x8 diff hash，感知比對）---
async function dhash(buf) {
  const { data } = await sharp(buf)
    .greyscale()
    .resize(9, 8, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let bits = 0n,
    i = 0n;
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const l = data[r * 9 + c],
        rr = data[r * 9 + c + 1];
      if (l > rr) bits |= 1n << i;
      i++;
    }
  return bits;
}
const ham = (a, b) => {
  let x = a ^ b,
    n = 0;
  while (x) {
    n += Number(x & 1n);
    x >>= 1n;
  }
  return n;
};

function walk(dir, exts) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p, exts));
    else if (exts.includes(extname(p).toLowerCase())) out.push(p);
  }
  return out;
}

async function toWebp(buf, name) {
  mkdirSync(OUT_DIR, { recursive: true });
  const out = join(OUT_DIR, `${name}.webp`);
  await sharp(buf).webp({ quality: QUALITY }).toFile(out);
  return { out, ref: `${PUBLIC_PREFIX}/${name}.webp`, bytes: statSync(out).size };
}

function safeName(fromUrlOrPath, used) {
  let n =
    basename(fromUrlOrPath.split('?')[0])
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'img';
  let cand = n,
    k = 2;
  while (used.has(cand)) cand = `${n}-${k++}`;
  used.add(cand);
  return cand;
}

async function internalize() {
  // 1) 收集 md 內的外部圖 URL
  const mds = walk('content/blog', ['.md']);
  const urlRe =
    /(https?:\/\/[^)\s"']+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^)\s"']*)?|https?:\/\/blogger\.googleusercontent\.com\/[^)\s"']+)/gi;
  const urls = new Set();
  for (const f of mds) for (const m of readFileSync(f, 'utf8').matchAll(urlRe)) urls.add(m[1]);
  console.log(`外部圖 URL：${urls.size}`);

  // 2) album dHash 索引
  let album = [];
  if (existsSync(ALBUMS)) {
    for (const f of walk(ALBUMS, ['.jpg', '.jpeg', '.png', '.gif'])) {
      try {
        album.push({ f, h: await dhash(readFileSync(f)) });
      } catch {}
    }
  }
  console.log(`Albums 原檔：${album.length}`);

  // 3) 每個 URL → 來源（本地原檔優先，否則下載）→ WebP q92
  const used = new Set();
  const urlToRef = new Map(); // url → /blog/img/x.webp
  const srcKeyToRef = new Map(); // 同圖去重（本地檔路徑 或 內容 hash）
  let fromLocal = 0,
    fromDl = 0,
    failed = [];
  for (const u of urls) {
    try {
      const resp = await fetch(u);
      if (!resp.ok) {
        failed.push([u, resp.status]);
        continue;
      }
      const buf = Buffer.from(await resp.arrayBuffer());
      const h = await dhash(buf);
      let best = null,
        bd = 99;
      for (const a of album) {
        const d = ham(h, a.h);
        if (d < bd) {
          bd = d;
          best = a;
        }
      }
      const local = bd <= 10 ? best.f : null;
      const srcBuf = local ? readFileSync(local) : buf;
      const srcKey = local ?? createHash('md5').update(buf).digest('hex');
      if (srcKeyToRef.has(srcKey)) {
        urlToRef.set(u, srcKeyToRef.get(srcKey));
        continue;
      }
      const name = safeName(local ?? u, used);
      const { ref } = await toWebp(srcBuf, name);
      srcKeyToRef.set(srcKey, ref);
      urlToRef.set(u, ref);
      local ? fromLocal++ : fromDl++;
    } catch (e) {
      failed.push([u, e.message]);
    }
  }
  console.log(`WebP 產出：本地原檔 ${fromLocal} / 下載 ${fromDl} / 去重後檔數 ${srcKeyToRef.size}`);
  if (failed.length) {
    console.log(`失敗 ${failed.length}：`);
    failed.forEach(([u, s]) => console.log(`  [${s}] ${u.slice(-60)}`));
  }

  // 4) 改寫 md（長 URL 優先，避免部分覆蓋）
  const pairs = [...urlToRef.entries()].sort((a, b) => b[0].length - a[0].length);
  let changed = 0,
    repl = 0;
  for (const f of mds) {
    let s = readFileSync(f, 'utf8'),
      before = s;
    for (const [u, ref] of pairs)
      if (s.includes(u)) {
        s = s.split(u).join(ref);
        repl++;
      }
    if (s !== before) {
      writeFileSync(f, s);
      changed++;
    }
  }
  console.log(`改寫 md：${changed} 檔、${repl} 處替換`);

  // 5) 殘留外部圖檢查
  let left = 0;
  for (const f of mds) for (const _ of readFileSync(f, 'utf8').matchAll(urlRe)) left++;
  console.log(`改寫後殘留外部圖 URL：${left}`);
}

async function optimizeDir(srcDir) {
  const used = new Set();
  const files = walk(srcDir, ['.jpg', '.jpeg', '.png', '.gif', '.webp']);
  for (const f of files) {
    const { ref, bytes } = await toWebp(readFileSync(f), safeName(f, used));
    console.log(`${f} → ${ref} (${(bytes / 1024).toFixed(0)} KB)`);
  }
}

if (args.includes('--internalize')) await internalize();
else if (args[0] && !args[0].startsWith('--')) await optimizeDir(args[0]);
else {
  console.error('用法：--internalize | <srcDir>');
  process.exit(1);
}
