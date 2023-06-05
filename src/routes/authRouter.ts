import express from 'express';

import { catchError } from '../utils/catchError';
import { authController } from '../controllers/authController';

export const authRouter = express.Router();

authRouter.post('/register', catchError(authController.register));
authRouter.post('/login', catchError(authController.login));
authRouter.post('/logout', catchError(authController.logout));
authRouter.post('/refresh', catchError(authController.refresh));
