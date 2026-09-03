import { Response } from 'express';
import { ErrorCode, Errors } from '../../../shared/constants/error';
import {
  badRequest,
  notFound,
  ok,
  serverError,
  unauthorized,
} from '../../../shared/utils/http-status';
import { IController, PlayerRequest } from '../../../shared/types';
import { IGetMatchFromModeUseCase } from '../usecases/get-match-from-mode.usecase';

export class GetMatchFromModeController implements IController {
  constructor(
    private readonly getMatchFromModeUsecase: IGetMatchFromModeUseCase
  ) {}

  async handle(req: PlayerRequest, res: Response) {
    const player = req.player;

    if (!player) {
      unauthorized(res, {
        code: ErrorCode.UNAUTHORIZED,
        message: Errors.UNAUTHORIZED,
      });
      return;
    }

    const { slug } = req.params as { slug?: string };

    if (!slug) {
      badRequest(res, {
        code: ErrorCode.BAD_REQUEST,
        message: Errors.BAD_REQUEST,
      });
      return;
    }

    const result = await this.getMatchFromModeUsecase.execute({ player, slug });

    if (result.isFailure()) {
      const error = {
        code: result.error,
        message: Errors[result.error],
      };

      if (result.error === ErrorCode.NOT_FOUND) {
        notFound(res, error);
        return;
      }

      serverError(res, error);
      return;
    }

    ok(res, result.value);
  }
}
