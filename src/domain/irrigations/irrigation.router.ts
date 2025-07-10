import express from 'express';
import { verifyJwt } from '../../middlewares/verify-jwt.middleware';
import { validateRequestBody } from '../../common/helpers/validate-request-body.helper';
import { irrigationRequestSchema } from './schemas/irrigation-request.schema';
import { handleAsync } from '../../common/helpers/async-handler.helper';

import * as irrigationController from './irrigation.controller';

const irrigationRouter = express.Router();

irrigationRouter.get(
  '/',
  verifyJwt,
  handleAsync(irrigationController.getUserIrrigations)
);

irrigationRouter.get(
  '/:id',
  verifyJwt,
  handleAsync(irrigationController.getIrrigationById)
);

irrigationRouter.post(
  '/',
  verifyJwt,
  validateRequestBody(irrigationRequestSchema),
  handleAsync(irrigationController.createIrrigation)
);

irrigationRouter.delete(
  '/:id',
  verifyJwt,
  handleAsync(irrigationController.deleteIrrigation)
);

export { irrigationRouter };