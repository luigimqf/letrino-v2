/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { AuthenticateRequest } from '../../../shared/types';
import { Errors } from '../../../shared/constants/error';
import {
  unauthorized,
  ok,
  serverError,
} from '../../../shared/utils/http-status';
import { Validate } from '../../../shared/utils/validator';
import { z } from 'zod';
import { IRegisterFailedAttemptUseCase } from '../usecases/register-failed-attempt.usecase';

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

export class RegisterFailedAttemptController implements IController {
  constructor(
    private readonly registerFailedAttemptUsecase: IRegisterFailedAttemptUseCase
  ) {}

  @Validate({ body: attemptSchema })
  async handle(req: AuthenticateRequest, res: Response) {
    const id = req.userId;

    if (!id) {
      return unauthorized(res);
    }

    const { attempt } = req.body;

    const result = await this.registerFailedAttemptUsecase.execute({
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
