import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '../../config/enviroment';

export function verifyGuestCookie(raw?: string): string | null {
  const [id, sig] = (raw ?? '').split('.');
  if (!id || !sig) return null;

  const expected = createHmac('sha256', env.GUEST_SESSION_SECRET)
    .update(id)
    .digest('base64url');

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  return id;
}

export function hashFingerprint(value?: string | null): string | null {
  if (!value) return null;

  return createHash('sha256')
    .update(`${value}${env.GUEST_SESSION_SECRET}`)
    .digest('hex')
    .slice(0, 64);
}
