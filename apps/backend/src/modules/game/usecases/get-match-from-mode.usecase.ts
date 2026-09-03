import {
  EAttemptStatus,
  MAX_ATTEMPTS_PER_MATCH,
} from '../../../shared/constants/attempt';
import { ErrorCode } from '../../../shared/constants/error';
import { EGameStatus } from '../../../shared/constants/match';
import { IAttemptRepository } from '../../../shared/repositories/attempt.repository';
import { IGamemodeRepository } from '../../../shared/repositories/game_mode.repository';
import { IMatchRepository } from '../../../shared/repositories/match.repository';
import { PlayerRef } from '../../../shared/types/player';
import { DateUtils } from '../../../shared/utils/date';
import { Either, Failure, Success } from '../../../shared/utils/either';

export interface IGetMatchFromModeInput {
  player: PlayerRef;
  slug: string;
}

export interface IModeMatch {
  matchId: string;
  mode: {
    slug: string;
    name: string;
  };
  status: EGameStatus;
  score: number;
  dayKey: string;
  maxAttempts: number;
  attempts: {
    userInput: string | null;
    result: EAttemptStatus;
  }[];
}

export interface IGetMatchFromModeUseCase {
  execute(
    input: IGetMatchFromModeInput
  ): Promise<Either<ErrorCode, IModeMatch>>;
}

export class GetMatchFromModeUseCase implements IGetMatchFromModeUseCase {
  constructor(
    private gamemodeRepository: IGamemodeRepository,
    private matchRepository: IMatchRepository,
    private attemptRepository: IAttemptRepository
  ) {}

  async execute({
    player,
    slug,
  }: IGetMatchFromModeInput): Promise<Either<ErrorCode, IModeMatch>> {
    const gamemode = await this.gamemodeRepository.findOne(slug);

    if (gamemode.isFailure() || !gamemode.value?.isActive) {
      return Failure.create(ErrorCode.NOT_FOUND);
    }

    const dayKey = DateUtils.dayKey();

    const match = await this.matchRepository.getOrCreateTodaysMatch({
      player,
      gamemodeId: gamemode.value.id,
      dayKey,
    });

    if (match.isFailure()) {
      return Failure.create(match.error);
    }

    const attempts = await this.attemptRepository.findByMatchId(match.value.id);

    if (attempts.isFailure()) {
      return Failure.create(ErrorCode.SERVER_ERROR);
    }

    return Success.create({
      matchId: match.value.id,
      mode: {
        slug: gamemode.value.slug,
        name: gamemode.value.name,
      },
      status: match.value.result,
      score: match.value.score ?? 0,
      dayKey: match.value.dayKey,
      maxAttempts: MAX_ATTEMPTS_PER_MATCH,
      attempts: attempts.value.map(attempt => ({
        userInput: attempt.userInput ?? null,
        result: attempt.result,
      })),
    });
  }
}
