import express from 'express';
import { authRouter } from '../domain/users/auth.routes';
import { pivotRouter } from '../domain/pivots/pivot.routes';
import { irrigationRouter } from '../domain/irrigations/irrigation.router';

const router = express.Router();

router.use('/auth', authRouter);
// router.use('/pivots', pivotRouter);
// router.use('/irrigations', irrigationRouter);

export { router };