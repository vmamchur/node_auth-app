import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/ApiError';
import { validateEmail, validatePassword } from '../utils/validation';
import { User } from '../models/User';
import { userService } from '../services/userService';
import { jwtService } from '../services/jwtService';

function sendAuthentication(res: Response, user: User) {
  const normalizedUser = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(normalizedUser);
  const refreshToken = jwtService.generateRefreshToken(normalizedUser);

  user.refreshToken = refreshToken;
  user.save();

  res.send({ user: normalizedUser, accessToken, refreshToken });
}

async function register(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (errors.email || errors.password) {
    throw ApiError.BadRequest('Validation error', errors);
  }

  const user = await userService.register(email, password);

  sendAuthentication(res, user);
}

async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const user = await userService.login(email, password);

  sendAuthentication(res, user);
}

async function logout(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.body;

  const userData = jwtService.validateRefreshToken(refreshToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  const user = await userService.getByEmail(userData.email);

  if (!user) {
    throw ApiError.BadRequest('User not found');
  }

  user.refreshToken = '';
  user.save();

  res.sendStatus(204);
}

async function refresh(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.body;

  const userData = jwtService.validateRefreshToken(refreshToken);

  if (!userData) {
    throw ApiError.Unauthorized();
  }

  const user = await userService.getByEmail(userData.email);

  sendAuthentication(res, user!);
}

export const authController = { register, login, logout, refresh };
