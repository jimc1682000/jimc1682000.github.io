#!/usr/bin/env node
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { lookup } from 'node:dns/promises';
import { createHash } from 'node:crypto';
import https from 'node:https';
import { dirname, resolve } from 'node:path';
import { clearTimeout, setTimeout } from 'node:timers';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { isBlockedAddress } from './lib/network-address.mjs';
import { flaggedCategories, prepareMentions, truncateUnicode } from './lib/webmention-utils.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..');
// `npm run build` runs this as raw node before Astro; load the same `.env` contributors
// copy from `.env.example` so PUBLIC_WEBMENTION_DOMAIN / WEBMENTION_IO_TOKEN are visible.
const envFile = resolve(repo, '.env');
if (existsSync(envFile) && typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(envFile);
}
const domain = process.env.PUBLIC_WEBMENTION_DOMAIN?.trim();
const apiToken = process.env.WEBMENTION_IO_TOKEN?.trim();
const cacheDir = resolve(repo, '.cache/webmentions');
const cacheFile = resolve(cacheDir, 'data.json');
const avatarDir = resolve(repo, 'public/webmention-avatars');
const overridesFile = resolve(repo, 'config/webmention-moderation.json');
const summaryFile = process.env.GITHUB_STEP_SUMMARY;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 4_000_000;
const MAX_REDIRECTS = 3;
// Socket inactivity timeout alone is not enough: a slow-drip body can keep the
// request alive indefinitely. Cap total wall-clock time per avatar (all hops).
const MAX_DOWNLOAD_MS = 15_000;
// Even with a per-image cap, sequential downloads of many attacker-controlled
// avatars can stall the whole deploy. Bound the whole localization phase.
const MAX_TOTAL_AVATAR_MS = 60_000;
const MAX_AVATAR_DOWNLOADS = 40;
const MAX_MENTION_PAGES = 50;
const MENTIONS_PER_PAGE = 1000;
// Keep each moderation request small; a single giant payload fails the whole
// call and the old catch path then fail-open'd every reply.
const MODERATION_BATCH_SIZE = 32;
// Bound the whole moderation phase so a flood cannot burn the deploy window.
const MAX_MODERATION_ITEMS = 200;
const MAX_MODERATION_MS = 45_000;
const MODERATION_REQUEST_MS = 20_000;
// Per-article publish cap (matches the old per-target API limit). Domain-wide
// fetch can return far more; without this, a flood bloats HTML/cache.
const MAX_PER_TARGET = 100;

function summary(lines) {
  if (summaryFile) appendFileSync(summaryFile, `${lines.join('\n')}\n`);
}

function emptyCache() {
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cacheFile, `${JSON.stringify({ version: 1, mentionsByPath: {} }, null, 2)}\n`);
}

if (!domain) {
  emptyCache();
  console.log('webmention sync: disabled (PUBLIC_WEBMENTION_DOMAIN is empty)');
  process.exit(0);
}
// Domain-wide mentions.jf2 needs the account token. Deploy injects it; quality gates
// that only need the domain for HTML endpoints may omit it.
if (!apiToken) {
  if (existsSync(cacheFile)) {
    console.warn('webmention sync: WEBMENTION_IO_TOKEN missing; keeping existing cache');
    process.exit(0);
  }
  emptyCache();
  console.warn(
    'webmention sync: WEBMENTION_IO_TOKEN missing; publishing empty mentions (set the secret on deploy)',
  );
  process.exit(0);
}

function withDeadline(promise, deadlineMs, message) {
  const remaining = Math.max(1, deadlineMs - Date.now());
  return new Promise((resolvePromise, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), remaining);
    timer.unref?.();
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolvePromise(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function resolvePublicAddress(hostname, deadlineMs) {
  const addresses = await withDeadline(
    lookup(hostname, { all: true, verbatim: true }),
    deadlineMs,
    'DNS resolution deadline exceeded',
  );
  if (!addresses.length || addresses.some(({ address }) => isBlockedAddress(address))) {
    throw new Error('host resolves to a private or reserved address');
  }
  return addresses[0];
}

async function downloadImage(url, redirects = 0, deadline = Date.now() + MAX_DOWNLOAD_MS) {
  if (Date.now() >= deadline) throw new Error('avatar download deadline exceeded');
  if (redirects > MAX_REDIRECTS) throw new Error('too many redirects');
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') throw new Error('avatar URL must use HTTPS');
  if (parsed.username || parsed.password || parsed.port) throw new Error('unsupported avatar URL');
  // DNS is part of the wall-clock budget: a stalled resolver must not hang the build.
  const resolved = await resolvePublicAddress(parsed.hostname, deadline);
  if (Date.now() >= deadline) throw new Error('avatar download deadline exceeded');

  const remainingMs = Math.max(1, deadline - Date.now());
  // Inactivity timeout still helps stuck sockets; never exceed the wall-clock budget.
  const socketTimeoutMs = Math.min(10_000, remainingMs);

  return new Promise((resolvePromise, reject) => {
    let settled = false;
    let deadlineTimer;
    const fail = (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(deadlineTimer);
      reject(error instanceof Error ? error : new Error(String(error)));
    };
    const succeed = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(deadlineTimer);
      resolvePromise(value);
    };

    const request = https.request(
      parsed,
      {
        headers: {
          Accept: 'image/avif,image/webp,image/png,image/jpeg,image/gif',
          'User-Agent': 'jimmychen.me-webmention-avatar-builder/1.0',
        },
        lookup: (_hostname, _options, callback) => {
          callback(null, resolved.address, resolved.family);
        },
        timeout: socketTimeoutMs,
      },
      (response) => {
        if ([301, 302, 303, 307, 308].includes(response.statusCode ?? 0)) {
          const location = response.headers.location;
          response.resume();
          if (!location) return fail(new Error('redirect without location'));
          return succeed(downloadImage(new URL(location, parsed).href, redirects + 1, deadline));
        }
        if (response.statusCode !== 200) {
          response.resume();
          return fail(new Error(`avatar HTTP ${response.statusCode}`));
        }
        const contentType = String(response.headers['content-type'] ?? '')
          .split(';')[0]
          .trim()
          .toLowerCase();
        if (
          !['image/avif', 'image/webp', 'image/png', 'image/jpeg', 'image/gif'].includes(
            contentType,
          )
        ) {
          response.resume();
          return fail(new Error(`unsupported avatar MIME ${contentType || 'unknown'}`));
        }
        const length = Number(response.headers['content-length'] ?? 0);
        if (length > MAX_IMAGE_BYTES) {
          response.resume();
          return fail(new Error('avatar exceeds byte limit'));
        }
        const chunks = [];
        let size = 0;
        response.on('data', (chunk) => {
          if (Date.now() >= deadline) {
            request.destroy(new Error('avatar download deadline exceeded'));
            return;
          }
          size += chunk.length;
          if (size > MAX_IMAGE_BYTES) {
            request.destroy(new Error('avatar exceeds byte limit'));
            return;
          }
          chunks.push(chunk);
        });
        response.on('end', () => succeed(Buffer.concat(chunks)));
      },
    );

    deadlineTimer = setTimeout(() => {
      request.destroy(new Error('avatar download deadline exceeded'));
    }, remainingMs);
    // Don't keep the process alive solely for this timer.
    deadlineTimer.unref?.();

    request.on('timeout', () => request.destroy(new Error('avatar request timed out')));
    request.on('error', fail);
    request.end();
  });
}

const avatarCache = new Map();
let avatarDownloads = 0;
// Set just before the localization loop so fetch/moderation don't eat the budget.
let avatarPhaseDeadline = 0;

async function localizeAvatar(photo) {
  if (!photo) return '';
  if (avatarCache.has(photo)) return avatarCache.get(photo);
  if (
    !avatarPhaseDeadline ||
    avatarDownloads >= MAX_AVATAR_DOWNLOADS ||
    Date.now() >= avatarPhaseDeadline
  ) {
    avatarCache.set(photo, '');
    return '';
  }
  avatarDownloads += 1;
  try {
    const hopDeadline = Math.min(Date.now() + MAX_DOWNLOAD_MS, avatarPhaseDeadline);
    const input = await downloadImage(photo, 0, hopDeadline);
    const image = sharp(input, { animated: false, limitInputPixels: MAX_IMAGE_PIXELS });
    const metadata = await image.metadata();
    if (
      !metadata.width ||
      !metadata.height ||
      metadata.width * metadata.height > MAX_IMAGE_PIXELS
    ) {
      throw new Error('avatar exceeds pixel limit');
    }
    const name = `${createHash('sha256').update(photo).digest('hex').slice(0, 24)}.webp`;
    await image
      .rotate()
      .resize(96, 96, { fit: 'cover' })
      .webp({ quality: 88 })
      .toFile(resolve(avatarDir, name));
    const local = `/webmention-avatars/${name}`;
    avatarCache.set(photo, local);
    return local;
  } catch {
    avatarCache.set(photo, '');
    return '';
  }
}

async function moderate(mentions) {
  const pending = mentions.filter(
    (mention) => mention.property === 'in-reply-to' && !mention.allowOverride,
  );
  if (!pending.length) return { hidden: new Map(), unavailable: false };
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { hidden: new Map(), unavailable: true };

  const hidden = new Map();
  let unavailable = false;
  // Cap count first; remainder is fail-open (published unmoderated).
  const queue = pending.slice(0, MAX_MODERATION_ITEMS);
  if (pending.length > MAX_MODERATION_ITEMS) unavailable = true;

  const phaseDeadline = Date.now() + MAX_MODERATION_MS;
  for (let offset = 0; offset < queue.length; offset += MODERATION_BATCH_SIZE) {
    if (Date.now() >= phaseDeadline) {
      unavailable = true;
      break;
    }
    const batch = queue.slice(offset, offset + MODERATION_BATCH_SIZE);
    const requestMs = Math.max(1, Math.min(MODERATION_REQUEST_MS, phaseDeadline - Date.now()));
    try {
      const response = await fetch('https://api.openai.com/v1/moderations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'omni-moderation-latest',
          input: batch.map((item) => item.text),
        }),
        signal: AbortSignal.timeout(requestMs),
      });
      if (!response.ok) throw new Error(`moderation HTTP ${response.status}`);
      const payload = await response.json();
      if (!Array.isArray(payload.results) || payload.results.length !== batch.length) {
        throw new Error('unexpected moderation response');
      }
      batch.forEach((mention, index) => {
        const result = payload.results[index];
        if (result.flagged) hidden.set(mention.id, flaggedCategories(result));
      });
    } catch {
      // Fail-open only this batch; keep flags from successful batches.
      unavailable = true;
    }
  }
  return { hidden, unavailable };
}

const overrides = JSON.parse(readFileSync(overridesFile, 'utf8'));

async function fetchAllMentions() {
  const children = [];
  // webmention.io uses 0-based pages; without `page` it returns page 0.
  for (let page = 0; page < MAX_MENTION_PAGES; page += 1) {
    const api = new URL('https://webmention.io/api/mentions.jf2');
    api.searchParams.set('domain', domain);
    api.searchParams.set('token', apiToken);
    api.searchParams.set('per-page', String(MENTIONS_PER_PAGE));
    api.searchParams.set('page', String(page));
    const response = await fetch(api, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`webmention.io HTTP ${response.status}`);
    const payload = await response.json();
    // Missing/non-array `children` is not a legitimate empty page — fail closed so we
    // keep the previous cache instead of wiping published mentions.
    if (!Object.hasOwn(payload, 'children') || !Array.isArray(payload.children)) {
      throw new Error('webmention.io response missing children array');
    }
    const batch = payload.children;
    if (!batch.length) return children;
    children.push(...batch);
    if (batch.length < MENTIONS_PER_PAGE) return children;
  }
  // Hit the page cap with a full final page — partial snapshot would wipe the rest.
  throw new Error(
    `webmention.io pagination cap reached (${MAX_MENTION_PAGES} × ${MENTIONS_PER_PAGE}); refusing partial sync`,
  );
}

let children = [];
try {
  children = await fetchAllMentions();
} catch (error) {
  // Auth or network failure must not blank the live site.
  if (existsSync(cacheFile)) {
    summary([
      '## Webmention sync',
      '',
      `- Fetch failed: ${error.message}`,
      '- Kept existing cache (not wiped)',
    ]);
    console.warn(`webmention sync: ${error.message}; keeping existing cache`);
    process.exit(0);
  }
  // Fresh checkout with no cache: failing the build keeps the previously deployed site.
  summary([
    '## Webmention sync',
    '',
    `- Fetch failed: ${error.message}`,
    '- No cache to fall back on; failing build',
  ]);
  console.error(`webmention sync: ${error.message}; no cache — failing build`);
  process.exit(1);
}

const { accepted, rejected } = prepareMentions(children, overrides, domain);
// Receipt order first so the per-target cap cannot be gamed with future-dated
// `published` values. webmention.io `wm-id` is assigned server-side and rises.
accepted.sort((a, b) => {
  const na = Number(a.id);
  const nb = Number(b.id);
  if (Number.isFinite(na) && Number.isFinite(nb) && na !== nb) return nb - na;
  return String(b.id).localeCompare(String(a.id));
});
const moderation = await moderate(accepted);
rmSync(avatarDir, { recursive: true, force: true });
mkdirSync(avatarDir, { recursive: true });

const mentionsByPath = {};
const hiddenRows = [];
avatarPhaseDeadline = Date.now() + MAX_TOTAL_AVATAR_MS;
for (const mention of accepted) {
  const categories = moderation.hidden.get(mention.id);
  if (categories) {
    hiddenRows.push({ id: mention.id, source: mention.source, categories });
    continue;
  }
  const bucket = (mentionsByPath[mention.targetPath] ??= []);
  if (bucket.length >= MAX_PER_TARGET) continue;
  const avatar = await localizeAvatar(mention.author.photo);
  bucket.push({
    id: mention.id,
    property: mention.property,
    source: mention.source,
    published: mention.published,
    author: { name: mention.author.name, url: mention.author.url, photo: avatar },
    text: mention.property === 'in-reply-to' ? truncateUnicode(mention.text) : '',
  });
}

mkdirSync(cacheDir, { recursive: true });
writeFileSync(
  cacheFile,
  `${JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), mentionsByPath }, null, 2)}\n`,
);

// GITHUB_STEP_SUMMARY is public on this repo — only aggregate counts, never IDs/sources.
summary([
  '## Webmention sync',
  '',
  `- Received: ${children.length}`,
  `- Published: ${Object.values(mentionsByPath).flat().length}`,
  `- Structurally rejected: ${rejected.length}`,
  `- Moderation hidden: ${hiddenRows.length}`,
  `- Moderation unavailable (fail-open): ${moderation.unavailable ? 'yes' : 'no'}`,
]);
console.log(
  `webmention sync: ${Object.values(mentionsByPath).flat().length} published, ${hiddenRows.length} hidden`,
);
