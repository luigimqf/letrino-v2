import { JwtPayload } from 'jsonwebtoken';
import { type Request, type Response } from 'express';
import { PlayerRef } from './player';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IController {
  handle(req: Request, res: Response): Promise<any>;
}

export interface ModelWithTimestamp {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OmitedModelFields<T extends ModelWithTimestamp> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface PlayerRequest extends Request {
  player?: PlayerRef;
}
export interface AuthenticateRequest extends Request {
  userId?: string;
}
export interface JwtPayloadWithId extends JwtPayload {
  id: string;
}
