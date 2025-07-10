import express from 'express';
import { verifyJwt } from '../../middlewares/verify-jwt.middleware';
import { validateRequestBody } from '../../helpers/validation.handler';
import { irrigationRequestSchema } from './schemas/irrigation-request.schema';
import { handleAsync } from '../../helpers/async.handler';

import * as irrigationController from './irrigation.controller';

const irrigationRouter = express.Router();

// irrigationRouter.get('/');
// irrigationRouter.get('/:id');
irrigationRouter.post(
  '/',
  verifyJwt,
  validateRequestBody(irrigationRequestSchema),
  handleAsync(irrigationController.createIrrigation)
);
// irrigationRouter.delete('/:id');

export { irrigationRouter };