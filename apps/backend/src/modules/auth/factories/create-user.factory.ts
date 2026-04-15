import { AppDataSource } from '../../../config/db/data-source';
import { User } from '../../../config/db/entity';
import { IController } from '../../../shared/types';
import { CreateUserController } from '../controllers/create-user.controller';
import { UserRepository } from '../../../shared/repositories/user.repository';
import { CreateUserUseCase } from '../usecases/create-user.usecase';

export const createUserFactory = (): IController => {
  const userRepository = new UserRepository(AppDataSource.getRepository(User));
  const createUserUsecase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUsecase);
  return createUserController;
};
