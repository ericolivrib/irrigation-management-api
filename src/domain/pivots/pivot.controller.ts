import { Request, Response } from 'express';
import { CreatePivotRequest } from './dtos/create-pivot-request.dto';
import { ApiResponse } from '../../types/api-response';
import { pivotService } from './pivot.service';
import { randomUUID } from 'crypto';
import { CreatePivotResponse } from './dtos/create-pivot-response.dto';
import { JwtPayload } from '../../types/jwt-payload';

export const pivotController = {
  createPivot: async (
    req: Request<object, any, CreatePivotRequest>,
    res: Response<ApiResponse<CreatePivotResponse, 'pivot'>>
  ) => {
    const requestBody = req.body;
    const { sub: userId }: JwtPayload = req['user'];

    const createdPivot = await pivotService.createPivot(requestBody, userId);

    res.status(201).json({
      message: 'Pivot created successfuly',
      pivot: createdPivot
    })
  }
}