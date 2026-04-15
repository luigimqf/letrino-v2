import { AppDataSource } from '../../../config/db/data-source';
import { User } from '../../../config/db/entity';
import { IController } from '../../../shared/types';
import { SignInController } from '../controllers/sign-in.controller';
import { UserRepository } from '../../../shared/repositories/user.repository';
import { SignInUseCase } from '../usecases/sign-in.usecase';

export const signInFactory = (): IController => {
  const userRepository = new UserRepository(AppDataSource.getRepository(User));
  const signInUsecase = new SignInUseCase(userRepository);
  const signInController = new SignInController(signInUsecase);
  return signInController;
};
