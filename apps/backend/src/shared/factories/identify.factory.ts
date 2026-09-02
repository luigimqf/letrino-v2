import { AppDataSource } from '../../config/db/data-source';
import { GuestSession } from '../../config/db/entity/GuestSession';
import { identify } from '../middlewares/identify';
import { GuestSessionRepository } from '../repositories/guest_session.repository';

export const identifyMiddleware = identify(
  new GuestSessionRepository(AppDataSource.getRepository(GuestSession))
);
