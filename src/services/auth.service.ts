import { randomUUID, UUID } from "node:crypto";
import { User } from "../core/models/user.model";
import { RegisterUserRequest } from "../schemas/register-user-request.dto";
import { RegisterUserResponse } from "../schemas/register-user-response.dto";
import { ConflictError } from "../core/errors/conflict.error";
import { LoginResponse } from "../schemas/login-response.dto";
import { UnauthorizedError } from "../core/errors/unauthorized.error";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../env/jwt.env";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

const users: User[] = [];
const SALT_ROUNDS = 10;


export async function registerUser(newUser: RegisterUserRequest): Promise<RegisterUserResponse> {
  const userAlreadyExists = users.some(user => user.username === newUser.username);

  if (userAlreadyExists) {
    throw new ConflictError("User already exists");
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);

  const user: User = {
    id: randomUUID(),
    username: newUser.username,
    password: hashedPassword,
  };

  users.push(user);

  return {
    id: user.id,
    username: user.username
  };
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const existentUser = users.find(user => user.username === username);

  if (!existentUser) {
    throw new UnauthorizedError("Invalid username or password");
  }

  const verifyPassword = await bcrypt.compare(password, existentUser.password);

  if (!verifyPassword) {
    throw new UnauthorizedError("Invalid username or password");
  }

  const payload = {
    iss: 'Irrigation Management API',
    sub: existentUser.id,
    jti: randomUUID(),
  };

  const expiresIn = JWT_EXPIRES_IN;

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256'
  });

  return {
    token,
    expiresIn: new Date(Date.now() + expiresIn * 1000)
  }
}

export async function getUserById(userId: UUID): Promise<User> {
  const user = users.find(u => u.id === userId);

  if (!user) {
    throw new UnauthorizedError('Unauthorized');
  }

  return { password: undefined, ...user };
}

