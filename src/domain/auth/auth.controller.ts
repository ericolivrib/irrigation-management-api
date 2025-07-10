import { Request, Response } from 'express';
import { RegisterUserRequest } from './dtos/register-user-request.dto';
import { ApiResponse } from '../../types/api-response';
import { RegisterUserResponse } from './dtos/register-user-response.dto';
import { LoginRequest } from './dtos/login-request.dto';
import { LoginResponse } from './dtos/login-response.dto';
import * as authService from './auth.service';

export async function registerUser(
  req: Request<object, any, RegisterUserRequest>,
  res: Response<ApiResponse<RegisterUserResponse, 'user'>>
): Promise<void> {
  const user = req.body;

  const registeredUser = await authService.registerUser(user);

  res.status(201).json({
    message: 'User registered successfully',
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
    message: 'Login successful',
    jwt: generatedToken
  });
}