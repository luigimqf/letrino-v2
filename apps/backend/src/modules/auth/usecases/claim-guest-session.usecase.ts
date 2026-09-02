import { DataSource } from 'typeorm';
import { ErrorCode } from '../../../shared/constants/error';
import { Either, Failure, Success } from '../../../shared/utils/either';
import { GuestSession } from '../../../config/db/entity/GuestSession';

export interface IClaimGuestSessionUseCase {
  execute(data: {
    userId: string;
    guestSessionId: string;
  }): Promise<Either<ErrorCode, { moved: number }>>;
}

export class ClaimGuestSessionUseCase implements IClaimGuestSessionUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(data: {
    userId: string;
    guestSessionId: string;
  }): Promise<Either<ErrorCode, { moved: number }>> {
    const { guestSessionId, userId } = data;

    try {
      return await this.dataSource.transaction(async manager => {
        const session = await manager.findOne(GuestSession, {
          where: { id: guestSessionId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!session) {
          return Failure.create(ErrorCode.NOT_FOUND);
        }

        if (session.claimedByUserId) {
          return session.claimedByUserId === userId
            ? Success.create({ moved: 0 })
            : Failure.create(ErrorCode.FORBIDDEN);
        }

        await manager.query(
          `DELETE FROM attempts
            WHERE "matchId" IN (
              SELECT g.id FROM matches g
               WHERE g."guestSessionId" = $1
                 AND EXISTS (SELECT 1 FROM matches u
                              WHERE u."userId"     = $2
                                AND u."gamemodeId" = g."gamemodeId"
                                AND u."dayKey"     = g."dayKey")
            )`,
          [guestSessionId, userId]
        );

        await manager.query(
          `DELETE FROM matches g
            WHERE g."guestSessionId" = $1
              AND EXISTS (SELECT 1 FROM matches u
                           WHERE u."userId"     = $2
                             AND u."gamemodeId" = g."gamemodeId"
                             AND u."dayKey"     = g."dayKey")`,
          [guestSessionId, userId]
        );

        const matches = await manager.query(
          `UPDATE matches SET "userId" = $2, "guestSessionId" = NULL
            WHERE "guestSessionId" = $1`,
          [guestSessionId, userId]
        );

        await manager.query(
          `UPDATE attempts SET "userId" = $2, "guestSessionId" = NULL
            WHERE "guestSessionId" = $1`,
          [guestSessionId, userId]
        );

        await manager.update(GuestSession, guestSessionId, {
          claimedByUserId: userId,
        });

        return Success.create({ moved: Number(matches[1] ?? 0) });
      });
    } catch (error) {
      return Failure.create(ErrorCode.SERVER_ERROR);
    }
  }
}
