import { Router } from 'express';
import { verifyJwt } from '../../middlewares/verify-jwt.middleware';
import { validateRequestBody } from '../../common/helpers/validate-request-body.helper';
import { irrigationRequestSchema } from './schemas/irrigation-request.schema';
import { handleAsync } from '../../common/helpers/async-handler.helper';

import * as irrigationController from './irrigation.controller';

export function createIrrigationRouter(): Router {
  const router = Router();
  
  router.get(
    '/',
    verifyJwt,
    handleAsync(irrigationController.getUserIrrigations)
  );
  
  router.get(
    '/:id',
    verifyJwt,
    handleAsync(irrigationController.getIrrigationById)
  );
  
  router.post(
    '/',
    verifyJwt,
    validateRequestBody(irrigationRequestSchema),
    handleAsync(irrigationController.createIrrigation)
  );
  
  router.delete(
    '/:id',
    verifyJwt,
    handleAsync(irrigationController.deleteIrrigation)
  );
  
  return router;
}