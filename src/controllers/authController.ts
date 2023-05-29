import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

async function register(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const user = await User.create({ email, password });

  res.send(user);
};

export const authController = { register };
