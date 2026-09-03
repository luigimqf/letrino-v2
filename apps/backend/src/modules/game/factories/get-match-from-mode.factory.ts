import { AppDataSource } from '../../../config/db/data-source';
import { Attempt, GameMode, Match } from '../../../config/db/entity';
import { IController } from '../../../shared/types';
import { AttemptRepository } from '../../../shared/repositories/attempt.repository';
import { GamemodeRepository } from '../../../shared/repositories/game_mode.repository';
import { MatchRepository } from '../../../shared/repositories/match.repository';
import { GetMatchFromModeController } from '../controllers/get-match-from-mode.controller';
import { GetMatchFromModeUseCase } from '../usecases/get-match-from-mode.usecase';

export const getMatchFromModeFactory = (): IController => {
  const gamemodeRepository = new GamemodeRepository(
    AppDataSource.getRepository(GameMode)
  );
  const matchRepository = new MatchRepository(
    AppDataSource.getRepository(Match)
  );
  const attemptRepository = new AttemptRepository(
    AppDataSource.getRepository(Attempt)
  );

  const getMatchFromModeUsecase = new GetMatchFromModeUseCase(
    gamemodeRepository,
    matchRepository,
    attemptRepository
  );

  return new GetMatchFromModeController(getMatchFromModeUsecase);
};
