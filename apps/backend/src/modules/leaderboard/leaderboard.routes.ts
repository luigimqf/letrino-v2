import { Router } from 'express';
import { getLeaderboardFactory } from './factories/get-leaderboard.factory';

const leaderboardRouter = Router();

leaderboardRouter.get('/', (req, res) =>
  getLeaderboardFactory().handle(req, res)
);

export { leaderboardRouter };
