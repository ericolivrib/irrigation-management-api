import express from 'express';
import * as authController from './auth.controller';
import { handleAsync } from '../../common/helpers/async-handler.helper';
import { validateRequestBody } from '../../common/helpers/validate-request-body.helper';
import { registerUserRequestSchema } from './schemas/register-user-request.schema';
import { loginRequestSchema } from './schemas/login-request.schema';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateRequestBody(registerUserRequestSchema),
  handleAsync(authController.registerUser)
);

authRouter.post(
  '/login',
  validateRequestBody(loginRequestSchema),
  handleAsync(authController.login)
);

export { authRouter };