import { AppDataSource } from '../../../config/db/data-source';
import { IController } from '../../../shared/types';
import { ClaimGuestSessionController } from '../controllers/claim-guest-session.controller';
import { ClaimGuestSessionUseCase } from '../usecases/claim-guest-session.usecase';

export const claimGuestSessionFactory = (): IController => {
  const claimGuestSessionUsecase = new ClaimGuestSessionUseCase(AppDataSource);
  const claimGuestSessionController = new ClaimGuestSessionController(
    claimGuestSessionUsecase
  );

  return claimGuestSessionController;
};
