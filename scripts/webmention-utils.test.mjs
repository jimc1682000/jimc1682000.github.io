import assert from 'node:assert/strict';
import test from 'node:test';
import { isBlockedAddress } from './lib/network-address.mjs';
import { normalizeTargetPath, prepareMentions, truncateUnicode } from './lib/webmention-utils.mjs';

const reply = {
  'wm-id': 42,
  'wm-property': 'in-reply-to',
  'wm-source': 'https://social.example/post/1',
  'wm-target': 'https://jimmychen.me/blog/example',
  content: { text: '公開回覆' },
  author: { name: 'Alice', photo: 'https://cdn.example/alice.jpg' },
};

test('normalizes a canonical target path with a trailing slash', () => {
  assert.equal(
    normalizeTargetPath('https://jimmychen.me/blog/example', 'jimmychen.me'),
    '/blog/example/',
  );
});

test('rejects a target on another domain', () => {
  assert.equal(normalizeTargetPath('https://example.com/blog/example', 'jimmychen.me'), null);
});

test('deny takes precedence over allow', () => {
  const result = prepareMentions([reply], { allow: ['42'], deny: ['42'] }, 'jimmychen.me');
  assert.equal(result.accepted.length, 0);
  assert.equal(result.rejected[0].reason, 'deny-override');
});

test('omits generic mention-of entries', () => {
  const result = prepareMentions(
    [{ ...reply, 'wm-id': 43, 'wm-property': 'mention-of' }],
    { allow: [], deny: [] },
    'jimmychen.me',
  );
  assert.equal(result.accepted.length, 0);
  assert.equal(result.rejected[0].reason, 'unsupported-property');
});

test('deduplicates by wm-id', () => {
  const result = prepareMentions([reply, reply], { allow: [], deny: [] }, 'jimmychen.me');
  assert.equal(result.accepted.length, 1);
  assert.equal(result.rejected[0].reason, 'duplicate');
});

test('truncates by Unicode characters instead of UTF-16 code units', () => {
  assert.equal(truncateUnicode('甲😀乙', 2), '甲😀…');
});

test('blocks private, reserved, and IPv4-mapped avatar destinations', () => {
  assert.equal(isBlockedAddress('127.0.0.1'), true);
  assert.equal(isBlockedAddress('198.51.100.8'), true);
  assert.equal(isBlockedAddress('::ffff:7f00:1'), true);
  assert.equal(isBlockedAddress('2606:4700:4700::1111'), false);
});
