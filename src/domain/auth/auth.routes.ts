import express from 'express';
import { authController } from './auth.controller';
import { handleAsync } from '../../helpers/async.handler';
import { validateRequestBody } from '../../helpers/validation.handler';
import { registerUserSchema } from './schemas/register-user.schema';
import { loginSchema } from './schemas/login.schema';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateRequestBody(registerUserSchema),
  handleAsync(authController.registerUser)
);

authRouter.post(
  '/login',
  validateRequestBody(loginSchema),
  handleAsync(authController.login)
);

export { authRouter };