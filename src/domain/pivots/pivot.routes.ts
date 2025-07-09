import express from 'express';
import { validateRequestBody } from '../../helpers/validation.handler';
import { createPivotRequestSchema } from './schema/create-pivot-request.schema';
import { handleAsync } from '../../helpers/async.handler';
import { pivotController } from './pivot.controller';
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
  validateRequestBody(createPivotRequestSchema),
  handleAsync(pivotController.createPivot)
);
// pivotRouter.put('/:id');
// pivotRouter.delete('/:id');

export { pivotRouter };