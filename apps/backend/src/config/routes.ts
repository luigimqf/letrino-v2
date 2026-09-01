import { Express } from 'express';
import { sentryUserContext } from '../shared/middlewares/sentry';
import { authRouter } from '../modules/auth/auth.routes';
import { gameRouter } from '../modules/game/game.routes';
import { meRouter } from '../modules/me/me.routes';
import { leaderboardRouter } from '../modules/leaderboard/leaderboard.routes';
import { env } from './enviroment';
import { gamemodeRouter } from '../modules/gamemode/gamemode.routes';

function setupRoutes(app: Express) {
  // Middleware global do Sentry para contexto
  app.use(sentryUserContext);

  //----------- Health Check ------------//

  app.get('/', async (req, res) => {
    console.log(env.NODE_ENV);
    res.send('Hello World!');
  });

  app.get('/crash', async (req, res) => {
    throw new Error('Crash test');
  });

  app.post('/', async (_, res) => {
    try {
      res.status(200).json('Alive');
      return;
    } catch (error) {
      res.status(500).json('Internal Server Error');
    }
  });

  //----------- Module Routes ------------//

  app.use('/auth', authRouter);
  app.use('/game', gameRouter);
  app.use('/me', meRouter);
  app.use('/leaderboard', leaderboardRouter);
  app.use('/gamemodes', gamemodeRouter);
}

export default setupRoutes;
