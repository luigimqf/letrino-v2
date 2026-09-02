/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { PlayerRequest } from '../../../shared/types';
import { Errors } from '../../../shared/constants/error';
import { ok, serverError } from '../../../shared/utils/http-status';
import { z } from 'zod';
import { Validate } from '../../../shared/utils/validator';
import { IForgotPasswordUsecase } from '../usecases/forgot-password.usecase';

export interface IController {
  handle(req: Request, res: Response): Promise<any>;
}

const emailSchema = z.object({
  email: z
    .string({
      message: Errors.REQUIRED_REFRESH_TOKEN,
    })
    .email(Errors.INVALID_EMAIL)
    .nonempty(Errors.REQUIRED_REFRESH_TOKEN),
});

export class ForgotPasswordController implements IController {
  constructor(private forgotPasswordUsecase: IForgotPasswordUsecase) {}
  @Validate({ body: emailSchema })
  async handle(req: PlayerRequest, res: Response) {
    const { email } = req.body;

    const result = await this.forgotPasswordUsecase.execute(email);

    if (result.isFailure()) {
      serverError(res, {
        code: result.error,
        message: Errors[result.error],
      });
      return;
    }

    ok(res);
    return;
  }
}
