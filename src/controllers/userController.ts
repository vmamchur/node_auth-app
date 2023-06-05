import { Request, Response, NextFunction } from 'express';

import { User } from '../models/User';
import { INormalizedUser } from '../types/INormalizedUser';
import { userService } from '../services/userService';

async function getAll(req: Request, res: Response, next: NextFunction) {
  const users = await User.findAll();
  const normalizedUsers: INormalizedUser[] = users.map(user => 
    userService.normalize(user)
  );

  res.send(normalizedUsers);
};

export const userController = { getAll };
