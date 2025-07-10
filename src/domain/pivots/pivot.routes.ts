import express, { Router } from 'express';
import { withValidationHandler } from '../../handlers/with-validation-handler';
import { pivotRequestSchema } from './schemas/pivot-request.schema';
import { withErrorHandler } from '../../handlers/with-error-handler';
import * as pivotController from './pivot.controller';
import { verifyJwt } from '../../middlewares/verify-jwt.middleware';

export function createPivotRouter(): Router {
  const router = express.Router();
  
  router.get(
    '/',
    verifyJwt,
    withErrorHandler(pivotController.getUserPivots)
  );
  
  router.get(
    '/:id',
    verifyJwt,
    withErrorHandler(pivotController.getPivotById)
  );
  
  router.post(
    '/',
    verifyJwt,
    withValidationHandler(pivotRequestSchema),
    withErrorHandler(pivotController.createPivot)
  );
  
  router.put(
    '/:id',
    verifyJwt,
    withValidationHandler(pivotRequestSchema),
    withErrorHandler(pivotController.updatePivot)
  );
  
  router.delete(
    '/:id',
    verifyJwt,
    withErrorHandler(pivotController.deletePivot)
  );
  
  return router;
}
