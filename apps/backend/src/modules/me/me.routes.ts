import { Router } from 'express';
import { authenticate } from '../../shared/middlewares/authenticate';
import { getUserDataFactory } from './factories/get-user-data.factory';
import { getUserStatisticFactory } from './factories/get-user-statistic.factory';
import { getUserAttemptsFactory } from './factories/get-user-attempts.factory';

const meRouter = Router();

meRouter.get('/', authenticate, (req, res) =>
  getUserDataFactory().handle(req, res)
);

meRouter.get('/statistics', authenticate, (req, res) =>
  getUserStatisticFactory().handle(req, res)
);

meRouter.get('/attempts', authenticate, (req, res) =>
  getUserAttemptsFactory().handle(req, res)
);

export { meRouter };
