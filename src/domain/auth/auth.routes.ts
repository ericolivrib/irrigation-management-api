import express from 'express';
import { authController } from './auth.controller';
import { asyncHandler } from '../../handlers/async.handler';

const authRouter = express.Router();

authRouter.post('/register', asyncHandler(authController.registerUser));

export { authRouter };