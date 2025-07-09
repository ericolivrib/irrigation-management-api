import express from 'express';
import { authRouter } from './auth.routes';
import { pivotRouter } from './pivot.routes';
import { irrigationRouter } from './irrigation.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/pivots', pivotRouter);
router.use('/irrigations', irrigationRouter);

export { router };