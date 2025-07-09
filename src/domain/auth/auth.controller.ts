import { Request, Response } from 'express';
import { RegisterUserRequestBody } from './dtos/register-user-request-body.dto';
import { ApiResponse } from '../../types/api-response';
import { RegisterUserResponseBody } from './dtos/register-user-response-body.dto';
import { authService } from './auth.service';

export const authController = {
  registerUser: async (
    req: Request<object, any, RegisterUserRequestBody, object, object>,
    res: Response<ApiResponse<RegisterUserResponseBody, 'user'>>
  ): Promise<void> => {
    const user = req.body;
    const registeredUser = await authService.registerUser(user);

    res.status(201).json({
      message: 'User registered successfully',
      user: registeredUser
    });
  }
};