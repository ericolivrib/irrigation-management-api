import { Request, Response } from 'express';
import { CreatePivotRequest } from './dtos/create-pivot-request.dto';
import { ApiResponse } from '../../types/api-response';
import { pivotService } from './pivot.service';
import { CreatePivotResponse } from './dtos/create-pivot-response.dto';
import { JwtPayload } from '../../types/jwt-payload';
import { Pivot } from '../../common/models/pivot.model';
import { getRequestUserId } from '../../helpers/get-request-user-id.helper';
import { UUID } from 'node:crypto';

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
  },

  getUserPivots: async (
    req: Request,
    res: Response<ApiResponse<Pivot[], 'pivots'>>
  ): Promise<void> => {
    const userId = getRequestUserId(req);
    const pivots = await pivotService.getUserPivots(userId);

    res.status(200).send({
      // TODO: Adjust return message
      message: 'Pivots successful retrieved',
      pivots
    })
  },

  getPivotById: async (
    req: Request<{ id: UUID }>,
    res: Response<ApiResponse<Pivot, 'pivot'>>
  ): Promise<void> => {
    const userId = getRequestUserId(req);
    const pivotId = req.params.id;

    const pivot = await pivotService.getPivotById(pivotId, userId);

    res.status(200).send({
      message: 'Pivot successful retrieved',
      pivot
    })
  }
}