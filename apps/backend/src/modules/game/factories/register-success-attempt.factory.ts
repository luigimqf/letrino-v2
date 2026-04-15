import { AppDataSource } from '../../../config/db/data-source';
import { Attempt, Match, UsedWord, Word } from '../../../config/db/entity';
import { IController } from '../../../shared/types';
import { RegisterSuccessAttemptController } from '../controllers/register-success-attempt.controller';
import { AttemptRepository } from '../../../shared/repositories/attempt.repository';
import { MatchRepository } from '../../../shared/repositories/match.repository';
import { UsedWordRepository } from '../../../shared/repositories/used_word.repository';
import { WordRepository } from '../../../shared/repositories/word.repository';
import { RegisterSuccessAttemptUseCase } from '../usecases/register-success-attempt.usecase';

export const registerSuccessAttemptFactory = (): IController => {
  const usedWordRepository = new UsedWordRepository(
    AppDataSource.getRepository(UsedWord)
  );
  const matchRepository = new MatchRepository(
    AppDataSource.getRepository(Match)
  );
  const attemptRepository = new AttemptRepository(
    AppDataSource.getRepository(Attempt)
  );
  const wordRepository = new WordRepository(AppDataSource.getRepository(Word));
  const registerSuccessAttemptUsecase = new RegisterSuccessAttemptUseCase(
    attemptRepository,
    matchRepository,
    usedWordRepository,
    wordRepository
  );
  const registerSuccessAttemptController = new RegisterSuccessAttemptController(
    registerSuccessAttemptUsecase
  );
  return registerSuccessAttemptController;
};
