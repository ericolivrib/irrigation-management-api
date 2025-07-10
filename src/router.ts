import express from 'express';
import { createAuthRouter } from './domain/auth/auth.routes';
import { createPivotRouter } from './domain/pivots/pivot.routes';
import { createIrrigationRouter } from './domain/irrigations/irrigation.router';

const router = express.Router();

router.use('/auth', createAuthRouter());
router.use('/pivots', createPivotRouter());
router.use('/irrigations', createIrrigationRouter());

export { router };