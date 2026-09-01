import { AppDataSource } from '../../config/db/data-source';
import { Attempt } from '../../config/db/entity/Attempt';
import { Errors } from '../constants/error';
import { EAttemptStatus } from '../constants/attempt';
import { DateUtils } from '../utils/date';
import { Either, Failure, Success } from '../utils/either';
import { Between, MoreThanOrEqual, LessThan, Repository } from 'typeorm';
import { GameMode } from '../../config/db/entity/GameMode';

export interface IGamemodeRepository {
  create(data: unknown): Promise<Either<Errors, GameMode>>;
  find(): Promise<Either<Errors, GameMode[]>>;
  findOne(slug: string): Promise<Either<Errors, GameMode>>;
}

interface IGamemodeCreate {
  slug: string;
  name: string;
  isActive: boolean;
}

export class GamemodeRepository implements IGamemodeRepository {
  constructor(private readonly repository: Repository<GameMode>) {}

  async create({
    slug,
    name,
    isActive,
  }: IGamemodeCreate): Promise<Either<Errors, GameMode>> {
    try {
      const gamemode = this.repository.create({
        slug,
        name,
        isActive,
      });
      const savedGamemode = await this.repository.save(gamemode);
      return Success.create(savedGamemode);
    } catch (error) {
      return Failure.create(Errors.SERVER_ERROR);
    }
  }

  async find(): Promise<Either<Errors, GameMode[]>> {
    try {
      const gamemodes = await this.repository.find({
        where: {
          isActive: true,
        },
        order: { createdAt: 'ASC' },
      });

      return Success.create(gamemodes);
    } catch (error) {
      return Failure.create(Errors.SERVER_ERROR);
    }
  }

  async findOne(slug: string): Promise<Either<Errors, GameMode>> {
    try {
      const gamemode = await this.repository.findOne({
        where: {
          slug,
        },
      });

      if (!gamemode) {
        return Failure.create(Errors.NOT_FOUND);
      }

      return Success.create(gamemode);
    } catch (error) {
      return Failure.create(Errors.SERVER_ERROR);
    }
  }
}
