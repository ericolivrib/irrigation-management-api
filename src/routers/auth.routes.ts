import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { withErrorHandler } from '../middlewares/with-error-handler';
import { withValidationHandler } from '../middlewares/with-validation-handler';
import { registerUserRequestSchema } from '../schemas/register-user-request.schema';
import { loginRequestSchema } from '../schemas/login-request.schema';

export function createAuthRouter(): Router {
  const router = Router();
  
  router.post(
    '/register',
    withValidationHandler(registerUserRequestSchema),
    withErrorHandler(authController.registerUser)
  );
  
  router.post(
    '/login',
    withValidationHandler(loginRequestSchema),
    withErrorHandler(authController.login)
  );
  
  return router;
}
