import { randomUUID, UUID } from "node:crypto";
import { User } from "../../common/models/user.model";
import { RegisterUserRequest } from "./dtos/register-user-request.dto";
import { RegisterUserResponse } from "./dtos/register-user-response.dto";
import { ConflictError } from "../../common/errors/conflict.error";
import { LoginResponse } from "./dtos/login-response.dto";
import { UnauthorizedError } from "../../common/errors/unauthorized.error";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../env/jwt.env";

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

