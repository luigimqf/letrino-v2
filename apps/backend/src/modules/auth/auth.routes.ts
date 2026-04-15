import { Router } from 'express';
import { createUserFactory } from './factories/create-user.factory';
import { signInFactory } from './factories/sign-in.factory';
import { socialSignInFactory } from './factories/social-sign-in.factory';
import { socialSignUpFactory } from './factories/social-sign-up.factory';
import { refreshTokenFactory } from './controllers/refresh-token.controller';
import { forgotPasswordFactory } from './factories/forgot-password.factory';
import { refreshPasswordFactory } from './factories/refresh-password.factory';

const authRouter = Router();

authRouter.post('/sign-in', (req, res) => signInFactory().handle(req, res));

authRouter.post('/sign-up', (req, res) => createUserFactory().handle(req, res));

authRouter.post('/google/sign-in', (req, res) =>
  socialSignInFactory().handle(req, res)
);

authRouter.post('/google/sign-up', (req, res) =>
  socialSignUpFactory().handle(req, res)
);

authRouter.post('/refresh-token', (req, res) =>
  refreshTokenFactory().handle(req, res)
);

authRouter.post('/forgot-password', (req, res) =>
  forgotPasswordFactory().handle(req, res)
);

authRouter.post('/refresh-password', (req, res) =>
  refreshPasswordFactory().handle(req, res)
);

export { authRouter };
