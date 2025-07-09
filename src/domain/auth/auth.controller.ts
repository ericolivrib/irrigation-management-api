import { Request, Response } from 'express';
import { RegisterUserRequestBody } from './dtos/register-user-request-body.dto';
import { ApiResponse } from '../../types/api-response';
import { RegisterUserResponseBody } from './dtos/register-user-response-body.dto';
import { authService } from './auth.service';
import { object } from 'zod/v4';
import { LoginRequestBody } from './dtos/login-request-body.dto';
import { LoginResponseBody } from './dtos/login-response-body.dto';

export const authController = {
  registerUser: async (
    req: Request<object, any, RegisterUserRequestBody>,
    res: Response<ApiResponse<RegisterUserResponseBody, 'user'>>
  ): Promise<void> => {
    const user = req.body;

    const registeredUser = await authService.registerUser(user);

    res.status(201).json({
      message: 'User registered successfully',
      user: registeredUser
    });
  },

  login: async (
    req: Request<object, any, LoginRequestBody>,
    res: Response<ApiResponse<LoginResponseBody, 'jwt'>>,
  ): Promise<void> => {
    const { username, password } = req.body;

    const generatedToken = await authService.login(username, password);

    res.status(200).json({
      message: 'Login successful',
      jwt: generatedToken
    }); 
  }
};