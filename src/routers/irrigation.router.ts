import { Router } from 'express';
import { verifyJwt } from '../middlewares/verify-jwt';
import { withValidationHandler } from '../middlewares/with-validation-handler';
import { irrigationRequestSchema } from '../schemas/irrigation-request.schema';
import { withErrorHandler } from '../middlewares/with-error-handler';

import * as irrigationController from '../controllers/irrigation.controller';

export function createIrrigationRouter(): Router {
  const router = Router();
  
  router.get(
    '/',
    verifyJwt,
    withErrorHandler(irrigationController.getUserIrrigations)
  );
  
  router.get(
    '/:id',
    verifyJwt,
    withErrorHandler(irrigationController.getIrrigationById)
  );
  
  router.post(
    '/',
    verifyJwt,
    withValidationHandler(irrigationRequestSchema),
    withErrorHandler(irrigationController.createIrrigation)
  );
  
  router.delete(
    '/:id',
    verifyJwt,
    withErrorHandler(irrigationController.deleteIrrigation)
  );
  
  return router;
}