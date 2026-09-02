import { IsNull } from 'typeorm';

export type PlayerRef =
  | { kind: 'user'; userId: string }
  | { kind: 'guest'; guestSessionId: string };

export function playerWhere(ref: PlayerRef) {
  return ref.kind === 'user'
    ? { userId: ref.userId, guestSessionId: IsNull() }
    : { guestSessionId: ref.guestSessionId, userId: IsNull() };
}

export function playerColumns(ref: PlayerRef) {
  return ref.kind === 'user'
    ? { userId: ref.userId, guestSessionId: null }
    : { userId: null, guestSessionId: ref.guestSessionId };
}
