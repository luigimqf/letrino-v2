import { GameMode } from '../../../config/db/entity/GameMode';
import { ErrorCode } from '../../../shared/constants/error';
import { IGamemodeRepository } from '../../../shared/repositories/game_mode.repository';
import { Either, Failure, Success } from '../../../shared/utils/either';

export interface IGetGamemodesUseCase {
  execute(): Promise<Either<ErrorCode, Pick<GameMode, 'slug' | 'name'>[]>>;
}

export class GetGamemodesUseCase implements IGetGamemodesUseCase {
  constructor(private gamemodeRepository: IGamemodeRepository) {}

  async execute(): Promise<
    Either<ErrorCode, Pick<GameMode, 'slug' | 'name'>[]>
  > {
    const gamemodes = await this.gamemodeRepository.find();

    if (gamemodes.isFailure() || !gamemodes.value) {
      return Failure.create(ErrorCode.WORD_NOT_FOUND);
    }

    const filteredGamemodes = gamemodes?.value?.map(mode => {
      const { slug, name } = mode;
      return {
        slug,
        name,
      };
    });

    return Success.create(filteredGamemodes);
  }
}
