import { AppDataSource } from '../../../config/db/data-source';
import { IController } from '../../../shared/types';
import { GamemodeRepository } from '../../../shared/repositories/game_mode.repository';
import { GameMode } from '../../../config/db/entity/GameMode';
import { GetGamemodesController } from '../controllers/get-gamemodes.controller';
import { GetGamemodesUseCase } from '../usecases/get-gamemodes.usecase';

export const getGamemodesFactory = (): IController => {
  const gamemodeRepository = new GamemodeRepository(
    AppDataSource.getRepository(GameMode)
  );

  const gamemodeUsecase = new GetGamemodesUseCase(gamemodeRepository);
  const getGamemodesController = new GetGamemodesController(gamemodeUsecase);
  return getGamemodesController;
};
