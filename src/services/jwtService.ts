import jwt from 'jsonwebtoken';

import { ACCESS_SECRET, REFRESH_SECRET } from '../config/constants';
import { INormalizedUser } from '../types/INormalizedUser';
import { IJwtPayload } from '../types/IJwtPayload';

function generateAccessToken(user: INormalizedUser) {
  return jwt.sign(user, ACCESS_SECRET!, { expiresIn: '5m' });
}

function generateRefreshToken(user: INormalizedUser) {
  return jwt.sign(user, REFRESH_SECRET!, { expiresIn: '30d' });
}

function validateAccessToken(token: string) {
  try {
    return jwt.verify(token, ACCESS_SECRET!);
  } catch (error) {
    return null;
  }
}

function validateRefreshToken(token: string): IJwtPayload | null {
  try {
    return jwt.verify(token, REFRESH_SECRET!) as IJwtPayload;
  } catch (error) {
    return null;
  }
}

export const jwtService = { generateAccessToken, validateAccessToken, generateRefreshToken, validateRefreshToken };
