import { Request, Response } from 'express';
import { CreatePivotRequest } from './dtos/create-pivot-request.dto';
import { ApiResponse } from '../../types/api-response';
import * as pivotService from './pivot.service';
import { CreatePivotResponse } from './dtos/create-pivot-response.dto';
import { Pivot } from '../../common/models/pivot.model';
import { getRequestUserId } from '../../helpers/get-request-user-id.helper';
import { UUID } from 'node:crypto';
import { UpdatePivotRequest } from './dtos/update-pivot-request.dto';

export const pivotController = {
  createPivot: async (
    req: Request<object, any, CreatePivotRequest>,
    res: Response<ApiResponse<CreatePivotResponse, 'pivot'>>
  ) => {
    const requestBody = req.body;
    const userId = getRequestUserId(req);

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
  },

  updatePivot: async (
    req: Request<{ id: UUID }, any, UpdatePivotRequest>,
    res: Response<ApiResponse<Pivot, 'pivot'>>
  ): Promise<void> => {
    const requestPivot = req.body;
    const userId = getRequestUserId(req);
    const pivotId = req.params.id;

    const updatedPivot = await pivotService.updatePivot(requestPivot, pivotId, userId);

    res.status(200).json({
      message: 'Pivot successful updated',
      pivot: updatedPivot
    });
  },

  deletePivot: async (
    req: Request<{ id: UUID }>,
    res: Response<ApiResponse<Pivot, 'deletedPivot'>>
  ): Promise<void> => {
    const userId = getRequestUserId(req);
    const pivotId = req.params.id;

    const deletedPivot = await pivotService.deletePivot(pivotId, userId);

    res.status(200).json({
      message: 'Pivot successful deleted',
      deletedPivot
    });
  }
}