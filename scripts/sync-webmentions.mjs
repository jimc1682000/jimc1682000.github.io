#!/usr/bin/env node
import { appendFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { lookup } from 'node:dns/promises';
import { createHash } from 'node:crypto';
import https from 'node:https';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { isBlockedAddress } from './lib/network-address.mjs';
import { flaggedCategories, prepareMentions, truncateUnicode } from './lib/webmention-utils.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..');
const domain = process.env.PUBLIC_WEBMENTION_DOMAIN?.trim();
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
const MAX_MENTION_PAGES = 50;
const MENTIONS_PER_PAGE = 1000;

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

async function resolvePublicAddress(hostname) {
  const addresses = await lookup(hostname, { all: true, verbatim: true });
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
  const resolved = await resolvePublicAddress(parsed.hostname);
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

async function localizeAvatar(photo) {
  if (!photo) return '';
  try {
    const input = await downloadImage(photo);
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
    return `/webmention-avatars/${name}`;
  } catch {
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

  try {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'omni-moderation-latest',
        input: pending.map((item) => item.text),
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) throw new Error(`moderation HTTP ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.results) || payload.results.length !== pending.length) {
      throw new Error('unexpected moderation response');
    }
    const hidden = new Map();
    pending.forEach((mention, index) => {
      const result = payload.results[index];
      if (result.flagged) hidden.set(mention.id, flaggedCategories(result));
    });
    return { hidden, unavailable: false };
  } catch {
    return { hidden: new Map(), unavailable: true };
  }
}

const overrides = JSON.parse(readFileSync(overridesFile, 'utf8'));

async function fetchAllMentions() {
  const children = [];
  // webmention.io uses 0-based pages; without `page` it returns page 0.
  for (let page = 0; page < MAX_MENTION_PAGES; page += 1) {
    const api = new URL('https://webmention.io/api/mentions.jf2');
    api.searchParams.set('domain', domain);
    api.searchParams.set('per-page', String(MENTIONS_PER_PAGE));
    api.searchParams.set('page', String(page));
    const response = await fetch(api, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`webmention.io HTTP ${response.status}`);
    const payload = await response.json();
    const batch = Array.isArray(payload.children) ? payload.children : [];
    if (!batch.length) break;
    children.push(...batch);
    if (batch.length < MENTIONS_PER_PAGE) break;
  }
  return children;
}

let children = [];
try {
  children = await fetchAllMentions();
} catch (error) {
  emptyCache();
  summary(['## Webmention sync', '', `- Fetch failed: ${error.message}`, '- Published replies: 0']);
  console.warn(`webmention sync: ${error.message}`);
  process.exit(0);
}

const { accepted, rejected } = prepareMentions(children, overrides, domain);
const moderation = await moderate(accepted);
rmSync(avatarDir, { recursive: true, force: true });
mkdirSync(avatarDir, { recursive: true });

const mentionsByPath = {};
const hiddenRows = [];
for (const mention of accepted) {
  const categories = moderation.hidden.get(mention.id);
  if (categories) {
    hiddenRows.push({ id: mention.id, source: mention.source, categories });
    continue;
  }
  const avatar = await localizeAvatar(mention.author.photo);
  const safe = {
    id: mention.id,
    property: mention.property,
    source: mention.source,
    published: mention.published,
    author: { name: mention.author.name, url: mention.author.url, photo: avatar },
    text: mention.property === 'in-reply-to' ? truncateUnicode(mention.text) : '',
  };
  (mentionsByPath[mention.targetPath] ??= []).push(safe);
}

mkdirSync(cacheDir, { recursive: true });
writeFileSync(
  cacheFile,
  `${JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), mentionsByPath }, null, 2)}\n`,
);

summary([
  '## Webmention sync',
  '',
  `- Received: ${children.length}`,
  `- Published: ${Object.values(mentionsByPath).flat().length}`,
  `- Structurally rejected: ${rejected.length}`,
  `- Moderation hidden: ${hiddenRows.length}`,
  `- Moderation unavailable (fail-open): ${moderation.unavailable ? 'yes' : 'no'}`,
  ...hiddenRows.map(
    (row) => `- Hidden wm-id ${row.id}: ${row.categories.join(', ') || 'flagged'} — ${row.source}`,
  ),
]);
console.log(
  `webmention sync: ${Object.values(mentionsByPath).flat().length} published, ${hiddenRows.length} hidden`,
);
