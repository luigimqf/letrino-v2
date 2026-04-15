import { Router } from 'express';
import { authenticate } from '../../shared/middlewares/authenticate';
import { checkAttempts } from '../../shared/middlewares/attempts';
import { getRandomWordFactory } from './factories/get-random-word.factory';
import { registerSuccessAttemptFactory } from './factories/register-success-attempt.factory';
import { registerFailedAttemptFactory } from './factories/register-failed-attempt.factory';

const gameRouter = Router();

gameRouter.get('/word', (req, res) => getRandomWordFactory().handle(req, res));

gameRouter.post('/attempt/success', authenticate, checkAttempts, (req, res) =>
  registerSuccessAttemptFactory().handle(req, res)
);

gameRouter.post('/attempt/fail', authenticate, checkAttempts, (req, res) =>
  registerFailedAttemptFactory().handle(req, res)
);

export { gameRouter };
