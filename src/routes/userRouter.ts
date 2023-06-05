import express from 'express';

import { catchError } from '../utils/catchError';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userController } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/', catchError(authMiddleware), catchError(userController.getAll));
