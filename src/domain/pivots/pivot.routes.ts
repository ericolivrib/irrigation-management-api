import express from 'express';
import { validateRequestBody } from '../../common/helpers/validate-request-body.helper';
import { pivotRequestSchema } from './schemas/pivot-request.schema';
import { handleAsync } from '../../common/helpers/async-handler.helper';
import * as pivotController from './pivot.controller';
import { verifyJwt } from '../../middlewares/verify-jwt.middleware';

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
  validateRequestBody(pivotRequestSchema),
  handleAsync(pivotController.createPivot)
);

pivotRouter.put(
  '/:id',
  verifyJwt,
  validateRequestBody(pivotRequestSchema),
  handleAsync(pivotController.updatePivot)
);

pivotRouter.delete(
  '/:id',
  verifyJwt,
  handleAsync(pivotController.deletePivot)
);

export { pivotRouter };