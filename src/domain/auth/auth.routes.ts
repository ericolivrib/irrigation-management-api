import { Router } from 'express';
import * as authController from './auth.controller';
import { handleAsync } from '../../common/helpers/async-handler.helper';
import { validateRequestBody } from '../../common/helpers/validate-request-body.helper';
import { registerUserRequestSchema } from './schemas/register-user-request.schema';
import { loginRequestSchema } from './schemas/login-request.schema';

export function createAuthRouter(): Router {
  const router = Router();
  
  router.post(
    '/register',
    validateRequestBody(registerUserRequestSchema),
    handleAsync(authController.registerUser)
  );
  
  router.post(
    '/login',
    validateRequestBody(loginRequestSchema),
    handleAsync(authController.login)
  );
  
  return router;
}
