import { AppDataSource } from '../../../config/db/data-source';
import { Attempt } from '../../../config/db/entity';
import { IController } from '../../../shared/types';
import { GetUserAttemptController } from '../controllers/get-user-attempts.controller';
import { AttemptRepository } from '../../../shared/repositories/attempt.repository';
import { GetUserAttemptsUseCase } from '../usecases/get-user-attempts.usecase';

export const getUserAttemptsFactory = (): IController => {
  const attemptRepository = new AttemptRepository(
    AppDataSource.getRepository(Attempt)
  );
  const getUserAttemptsUsecase = new GetUserAttemptsUseCase(attemptRepository);
  const getUserAttemptsController = new GetUserAttemptController(
    getUserAttemptsUsecase
  );
  return getUserAttemptsController;
};
