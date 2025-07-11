import express, { Router } from 'express';
import { withValidationHandler } from '../middlewares/with-validation-handler';
import { pivotRequestSchema } from '../schemas/pivot-request.schema';
import { withErrorHandler } from '../middlewares/with-error-handler';
import * as pivotController from '../controllers/pivot.controller';
import { verifyJwt } from '../middlewares/verify-jwt';

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
