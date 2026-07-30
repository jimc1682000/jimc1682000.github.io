const ALLOWED_PROPERTIES = new Set(['in-reply-to', 'like-of', 'repost-of']);
const MAX_RAW_TEXT = 10_000;
export const DISPLAY_TEXT_LIMIT = 200;

export function normalizeMentionId(value) {
  if (typeof value === 'number' && Number.isSafeInteger(value)) return String(value);
  if (typeof value === 'string' && /^[A-Za-z0-9_-]+$/.test(value)) return value;
  return null;
}

export function isPublicHttpUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function normalizeTargetPath(value, expectedDomain) {
  if (!isPublicHttpUrl(value)) return null;
  const url = new URL(value);
  if (url.hostname !== expectedDomain) return null;
  const path = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
  return path.replace(/\/+/g, '/');
}

export function truncateUnicode(value, limit = DISPLAY_TEXT_LIMIT) {
  const chars = Array.from(value.trim());
  if (chars.length <= limit) return chars.join('');
  return `${chars.slice(0, limit).join('')}…`;
}

export function prepareMentions(children, overrides, expectedDomain) {
  const allow = new Set((overrides.allow ?? []).map(String));
  const deny = new Set((overrides.deny ?? []).map(String));
  const seen = new Set();
  const accepted = [];
  const rejected = [];

  for (const raw of Array.isArray(children) ? children : []) {
    const id = normalizeMentionId(raw?.['wm-id']);
    const property = raw?.['wm-property'];
    const source = raw?.url ?? raw?.['wm-source'];
    const targetPath = normalizeTargetPath(raw?.['wm-target'], expectedDomain);
    let reason = null;

    if (!id) reason = 'invalid-id';
    else if (seen.has(id)) reason = 'duplicate';
    else if (deny.has(id)) reason = 'deny-override';
    else if (raw?.['wm-private'] || raw?.['wm-deleted']) reason = 'not-public';
    else if (!ALLOWED_PROPERTIES.has(property)) reason = 'unsupported-property';
    else if (!isPublicHttpUrl(source) || !targetPath) reason = 'invalid-url';

    const text = typeof raw?.content?.text === 'string' ? raw.content.text.trim() : '';
    if (!reason && property === 'in-reply-to' && !text) reason = 'missing-text';
    if (!reason && property === 'in-reply-to' && Array.from(text).length > MAX_RAW_TEXT) {
      reason = 'text-too-long';
    }

    if (id) seen.add(id);
    if (reason) {
      rejected.push({ id: id ?? 'unknown', source: isPublicHttpUrl(source) ? source : '', reason });
      continue;
    }

    accepted.push({
      id,
      property,
      source,
      targetPath,
      published: typeof raw.published === 'string' ? raw.published : null,
      author: {
        name: typeof raw.author?.name === 'string' ? raw.author.name.slice(0, 200) : '',
        url: isPublicHttpUrl(raw.author?.url) ? raw.author.url : '',
        photo: typeof raw.author?.photo === 'string' ? raw.author.photo : '',
      },
      text,
      allowOverride: allow.has(id),
    });
  }

  return { accepted, rejected };
}

export function flaggedCategories(result) {
  return Object.entries(result?.categories ?? {})
    .filter(([, flagged]) => flagged)
    .map(([category]) => category);
}
