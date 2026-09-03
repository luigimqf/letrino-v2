import { Router } from 'express';
import { identifyMiddleware } from '../../shared/factories/identify.factory';
import { getRandomWordFactory } from './factories/get-random-word.factory';
import { getMatchFromModeFactory } from './factories/get-match-from-mode.factory';

const gameRouter = Router();

gameRouter.get('/word', (req, res) => getRandomWordFactory().handle(req, res));

gameRouter.get('/match/:slug/today', identifyMiddleware, (req, res) =>
  getMatchFromModeFactory().handle(req, res)
);

export { gameRouter };
