import express from 'express';
import { validateRequestBody } from '../../helpers/validation.handler';
import { createPivotRequestSchema } from './schemas/create-pivot-request.schema';
import { handleAsync } from '../../helpers/async.handler';
import * as pivotController from './pivot.controller';
import { verifyJwt } from '../../middlewares/verify-jwt.middleware';
import { updatePivotRequestSchema } from './schemas/update-pivot-request.schema';

const pivotRouter = express.Router();

pivotRouter.get(
  '/',
  verifyJwt,
  handleAsync(pivotController.getUserPivots)
);

pivotRouter.get(
  '/:id',
  verifyJwt,
  handleAsync(pivotController.getPivotById)
);

pivotRouter.post(
  '/',
  verifyJwt,
  validateRequestBody(createPivotRequestSchema),
  handleAsync(pivotController.createPivot)
);

pivotRouter.put(
  '/:id',
  verifyJwt,
  validateRequestBody(updatePivotRequestSchema),
  handleAsync(pivotController.updatePivot)
);

pivotRouter.delete(
  '/:id',
  verifyJwt,
  handleAsync(pivotController.deletePivot)
);

export { pivotRouter };