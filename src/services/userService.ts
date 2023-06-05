import bcrypt from 'bcrypt';

import { ApiError } from "../utils/ApiError";
import { User } from "../models/User";
import { INormalizedUser } from "../types/INormalizedUser";

function normalize(user: User): INormalizedUser {
  const { id, email } = user;

  return { id, email };
};

async function getByEmail(email: string) {
  return await User.findOne({ where: { email } });
}

async function register(email: string, password: string) {
  const existingUser = await getByEmail(email);

  if (existingUser) {
    throw ApiError.BadRequest('Validation error', {
      email: 'Email is already taken',
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, encryptedPassword });

  return user;
}

async function login(email: string, password: string) {
  const user = await userService.getByEmail(email);

  if (!user) {
    throw ApiError.BadRequest('User with this email does not exist');
  }

  const isPasswordValid = await bcrypt.compare(password, user.encryptedPassword);

  if (!isPasswordValid) {
    throw ApiError.BadRequest('Password is wrong', {
      password: 'Password is wrong',
    });
  }

  return user;
}

export const userService = { normalize, getByEmail, register, login };
