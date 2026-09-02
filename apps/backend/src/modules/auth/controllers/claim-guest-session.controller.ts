import { Response } from 'express';
import { AuthenticateRequest, IController } from '../../../shared/types';
import { ErrorCode, Errors } from '../../../shared/constants/error';
import {
  badRequest,
  forbidden,
  notFound,
  ok,
  serverError,
  unauthorized,
} from '../../../shared/utils/http-status';
import { verifyGuestCookie } from '../../../shared/utils/guest-session';
import { IClaimGuestSessionUseCase } from '../usecases/claim-guest-session.usecase';

export class ClaimGuestSessionController implements IController {
  constructor(
    private readonly claimGuestSessionUsecase: IClaimGuestSessionUseCase
  ) {}

  async handle(req: AuthenticateRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return unauthorized(res, {
        code: ErrorCode.UNAUTHORIZED,
        message: Errors.UNAUTHORIZED,
      });
    }

    const guestSessionId = verifyGuestCookie(
      req.headers['x-guest-session'] as string
    );

    if (!guestSessionId) {
      return badRequest(res, {
        code: ErrorCode.BAD_REQUEST,
        message: Errors.BAD_REQUEST,
      });
    }

    const result = await this.claimGuestSessionUsecase.execute({
      userId,
      guestSessionId,
    });

    if (result.isFailure()) {
      const error = { code: result.error, message: Errors[result.error] };

      if (result.error === ErrorCode.NOT_FOUND) return notFound(res, error);
      if (result.error === ErrorCode.FORBIDDEN) return forbidden(res, error);

      return serverError(res, error);
    }

    return ok(res, result.value);
  }
}
