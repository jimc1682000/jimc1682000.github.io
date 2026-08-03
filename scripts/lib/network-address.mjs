import { isIP } from 'node:net';

function blockedIpv4(address) {
  const [a, b, c] = address.split('.').map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 0 || b === 168 || (b === 88 && c === 99) || (b === 175 && c === 48))) ||
    (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) ||
    (a === 203 && b === 0 && c === 113) ||
    a >= 224
  );
}

function mappedIpv4(address) {
  if (!address.startsWith('::ffff:')) return null;
  const suffix = address.slice(7);
  if (isIP(suffix) === 4) return suffix;
  const groups = suffix.split(':');
  if (groups.length !== 2 || groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))) return null;
  const value = (Number.parseInt(groups[0], 16) << 16) | Number.parseInt(groups[1], 16);
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 0xff).join('.');
}

export function isBlockedAddress(address) {
  const family = isIP(address);
  if (family === 4) return blockedIpv4(address);
  if (family === 6) {
    const normalized = address.toLowerCase();
    const mapped = mappedIpv4(normalized);
    if (mapped) return blockedIpv4(mapped);
    return (
      normalized === '::' ||
      normalized === '::1' ||
      normalized.startsWith('fc') ||
      normalized.startsWith('fd') ||
      normalized.startsWith('fe8') ||
      normalized.startsWith('fe9') ||
      normalized.startsWith('fea') ||
      normalized.startsWith('feb') ||
      normalized.startsWith('ff') ||
      normalized.startsWith('2001:db8:')
    );
  }
  return true;
}
