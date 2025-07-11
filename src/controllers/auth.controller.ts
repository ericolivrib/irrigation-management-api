import { Request, Response } from 'express';
import { RegisterUserRequest } from '../schemas/register-user-request.dto';
import { ApiResponse } from '../types/api-response';
import { RegisterUserResponse } from '../schemas/register-user-response.dto';
import { LoginRequest } from '../schemas/login-request.dto';
import { LoginResponse } from '../schemas/login-response.dto';
import * as authService from '../services/auth.service';

export async function registerUser(
  req: Request<object, any, RegisterUserRequest>,
  res: Response<ApiResponse<RegisterUserResponse, 'user'>>
): Promise<void> {
  const newUser = req.body;

  const registeredUser = await authService.registerUser(newUser);

  res.status(201).json({
    message: 'User successfully registered',
    user: registeredUser
  });
}

export async function login(
  req: Request<object, any, LoginRequest>,
  res: Response<ApiResponse<LoginResponse, 'jwt'>>,
): Promise<void> {
  const { username, password } = req.body;

  const generatedToken = await authService.login(username, password);

  res.status(200).json({
    message: 'Login successfully',
    jwt: generatedToken
  });
}