import express from 'express';
import { createAuthRouter } from './auth.routes';
import { createPivotRouter } from './pivot.routes';
import { createIrrigationRouter } from './irrigation.router';

const router = express.Router();

router.use('/auth', createAuthRouter());
router.use('/pivots', createPivotRouter());
router.use('/irrigations', createIrrigationRouter());

export { router };