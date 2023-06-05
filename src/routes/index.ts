import express from 'express';

import { authRouter } from './authRouter';
import { userRouter } from './userRouter';

export const router = express.Router();

router.use('/', authRouter);
router.use('/users', userRouter);
