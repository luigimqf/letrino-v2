import { Response, NextFunction } from 'express';
import { Jwt } from '../utils/jwt';
import { unauthorized } from '../utils/http-status';
import { ErrorCode, Errors } from '../constants/error';
import { hashFingerprint, verifyGuestCookie } from '../utils/guest-session';
import { IGuestSessionRepository } from '../repositories/guest_session.repository';
import { PlayerRequest } from '../types';

export function identify(guestRepository: IGuestSessionRepository) {
  return async (req: PlayerRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = Jwt.verify(token);

      if (decoded.isFailure()) {
        return unauthorized(res, {
          code: ErrorCode.INVALID_TOKEN,
          message: Errors.INVALID_TOKEN,
        });
      }

      req.player = { kind: 'user', userId: decoded.value.id };
      req.userId = decoded.value.id;

      return next();
    }

    const guestId = verifyGuestCookie(req.headers['x-guest-session'] as string);

    if (!guestId) {
      return unauthorized(res, {
        code: ErrorCode.NO_TOKEN,
        message: Errors.NO_TOKEN,
      });
    }

    const session = await guestRepository.touch(guestId, {
      ipHash: hashFingerprint(req.ip),
      userAgentHash: hashFingerprint(req.headers['user-agent']),
    });

    if (session.isFailure()) {
      return unauthorized(res, {
        code: session.error,
        message: Errors[session.error],
      });
    }

    req.player = { kind: 'guest', guestSessionId: guestId };

    next();
  };
}
