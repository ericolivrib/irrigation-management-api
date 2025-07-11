import express from 'express';
import { createAuthRouter } from './auth.router';
import { createPivotRouter } from './pivot.router';
import { createIrrigationRouter } from './irrigation.router';

const router = express.Router();

router.use('/auth', createAuthRouter());
router.use('/pivots', createPivotRouter());
router.use('/irrigations', createIrrigationRouter());

export { router };