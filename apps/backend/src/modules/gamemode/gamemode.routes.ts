import { Router } from 'express';
import { getGamemodesFactory } from './factories/get-gamemodes.factory';

const gamemodeRouter = Router();

gamemodeRouter.get('/list', (req, res) =>
  getGamemodesFactory().handle(req, res)
);

export { gamemodeRouter };
