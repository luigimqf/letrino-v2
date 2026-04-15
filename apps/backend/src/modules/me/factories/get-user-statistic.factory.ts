import { AppDataSource } from '../../../config/db/data-source';
import { Match } from '../../../config/db/entity';
import { IController } from '../../../shared/types';
import { GetUserStatisticController } from '../controllers/get-user-statistic';
import { MatchRepository } from '../../../shared/repositories/match.repository';
import { GetUserStatisticUseCase } from '../usecases/get-user-statistic.usecase';

export const getUserStatisticFactory = (): IController => {
  const matchRepository = new MatchRepository(
    AppDataSource.getRepository(Match)
  );
  const getUserStatisticUsecase = new GetUserStatisticUseCase(matchRepository);
  const getUserStatisticController = new GetUserStatisticController(
    getUserStatisticUsecase
  );
  return getUserStatisticController;
};
