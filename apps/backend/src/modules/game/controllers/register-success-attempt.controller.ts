/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { PlayerRequest } from '../../../shared/types';
import { Errors } from '../../../shared/constants/error';
import {
  unauthorized,
  ok,
  serverError,
} from '../../../shared/utils/http-status';
import { IRegisterSuccessAttemptUseCase } from '../usecases/register-success-attempt.usecase';
import { Validate } from '../../../shared/utils/validator';
import { z } from 'zod';

export interface IController {
  handle(req: Request, res: Response): Promise<any>;
}

const attemptSchema = z.object({
  attempt: z
    .string({
      message: 'Attempt must be a string',
    })
    .nonempty('Attempt is required'),
});

export class RegisterSuccessAttemptController implements IController {
  constructor(
    private readonly registerSuccessAttemptUsecase: IRegisterSuccessAttemptUseCase
  ) {}

  @Validate({ body: attemptSchema })
  async handle(req: PlayerRequest, res: Response) {
    const id = req.userId;

    if (!id) {
      return unauthorized(res);
    }

    const { attempt } = req.body;

    const result = await this.registerSuccessAttemptUsecase.execute({
      id,
      attempt,
    });

    if (result.isFailure()) {
      serverError(res, {
        code: result.error,
        message: Errors[result.error],
      });
      return;
    }

    ok(res, result.value);
  }
}
