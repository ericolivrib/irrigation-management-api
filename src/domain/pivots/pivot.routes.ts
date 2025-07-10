import express, { Router } from 'express';
import { validateRequestBody } from '../../common/helpers/validate-request-body.helper';
import { pivotRequestSchema } from './schemas/pivot-request.schema';
import { handleAsync } from '../../common/helpers/async-handler.helper';
import * as pivotController from './pivot.controller';
import { verifyJwt } from '../../middlewares/verify-jwt.middleware';

export function createPivotRouter(): Router {
  const router = express.Router();
  
  router.get(
    '/',
    verifyJwt,
    handleAsync(pivotController.getUserPivots)
  );
  
  router.get(
    '/:id',
    verifyJwt,
    handleAsync(pivotController.getPivotById)
  );
  
  router.post(
    '/',
    verifyJwt,
    validateRequestBody(pivotRequestSchema),
    handleAsync(pivotController.createPivot)
  );
  
  router.put(
    '/:id',
    verifyJwt,
    validateRequestBody(pivotRequestSchema),
    handleAsync(pivotController.updatePivot)
  );
  
  router.delete(
    '/:id',
    verifyJwt,
    handleAsync(pivotController.deletePivot)
  );
  
  return router;
}
