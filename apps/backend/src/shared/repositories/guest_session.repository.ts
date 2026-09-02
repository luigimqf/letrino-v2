import { Repository } from 'typeorm';
import { GuestSession } from '../../config/db/entity/GuestSession';
import { ErrorCode } from '../constants/error';
import { Either, Failure, Success } from '../utils/either';

export interface ITouchGuestSessionMeta {
  ipHash?: string | null;
  userAgentHash?: string | null;
}

export interface IGuestSessionRepository {
  touch(
    id: string,
    meta?: ITouchGuestSessionMeta
  ): Promise<Either<ErrorCode, GuestSession>>;
  findOne(id: string): Promise<Either<ErrorCode, GuestSession>>;
}

export class GuestSessionRepository implements IGuestSessionRepository {
  constructor(private readonly repository: Repository<GuestSession>) {}

  async touch(
    id: string,
    meta: ITouchGuestSessionMeta = {}
  ): Promise<Either<ErrorCode, GuestSession>> {
    try {
      const rows: GuestSession[] = await this.repository.query(
        `INSERT INTO guest_sessions (id, "lastSeenAt", "ipHash", "userAgentHash")
              VALUES ($1, now(), $2, $3)
        ON CONFLICT (id) DO UPDATE
                SET "lastSeenAt" = now(),
                    "updatedAt"  = now()
          RETURNING *`,
        [id, meta.ipHash ?? null, meta.userAgentHash ?? null]
      );

      const session = rows[0];

      if (!session) {
        return Failure.create(ErrorCode.SERVER_ERROR);
      }

      if (session.claimedByUserId) {
        return Failure.create(ErrorCode.GUEST_SESSION_CLAIMED);
      }

      return Success.create(session);
    } catch (error) {
      return Failure.create(ErrorCode.SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Either<ErrorCode, GuestSession>> {
    try {
      const session = await this.repository.findOne({
        where: {
          id,
        },
      });

      if (!session) {
        return Failure.create(ErrorCode.SERVER_ERROR);
      }

      if (session.claimedByUserId) {
        return Failure.create(ErrorCode.GUEST_SESSION_CLAIMED);
      }

      return Success.create(session);
    } catch (error) {
      return Failure.create(ErrorCode.SERVER_ERROR);
    }
  }
}
