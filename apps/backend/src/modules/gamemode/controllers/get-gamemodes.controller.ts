/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Errors } from '../../../shared/constants/error';
import { notFound, ok } from '../../../shared/utils/http-status';
import { Jwt } from '../../../shared/utils/jwt';
import { IGetGamemodesUseCase } from '../usecases/get-gamemodes.usecase';

export interface IController {
  handle(req: Request, res: Response): Promise<any>;
}

export class GetGamemodesController implements IController {
  constructor(private readonly getRandomWordUsecase: IGetGamemodesUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.getRandomWordUsecase.execute();

    if (result.isFailure()) {
      notFound(res, {
        code: result.error,
        message: Errors[result.error],
      });
      return;
    }

    ok(res, result.value);
  }
}
