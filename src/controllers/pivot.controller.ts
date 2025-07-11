import { Request, Response } from 'express';
import { PivotRequest } from '../schemas/pivot-request.dto';
import { ApiResponse } from '../schemas/api-response.dto';
import * as pivotService from '../services/pivot.service';
import { Pivot } from '../models/pivot.model';
import { getRequestUserId } from '../helpers/get-request-user-id.helper';
import { UUID } from 'node:crypto';

export async function createPivot(
  req: Request<object, any, PivotRequest>,
  res: Response<ApiResponse<Pivot, 'pivot'>>
) {
  const newPivot = req.body;
  const userId = getRequestUserId(req);

  const createdPivot = await pivotService.createPivot(userId, newPivot);

  res.status(201).json({
    message: 'Pivot created successfuly',
    pivot: createdPivot
  })
}

export async function getUserPivots(
  req: Request,
  res: Response<ApiResponse<Pivot[], 'pivots'>>
): Promise<void> {
  const userId = getRequestUserId(req);
  const pivots = await pivotService.getUserPivots(userId);

  res.status(200).send({
    // TODO: Adjust return message
    message: pivots.length > 0
      ? 'User don\'t have any pivots'
      : 'User pivots successfully retreved',
    pivots
  })
}

export async function getPivotById(
  req: Request<{ id: UUID }>,
  res: Response<ApiResponse<Pivot, 'pivot'>>
): Promise<void> {
  const userId = getRequestUserId(req);
  const pivotId = req.params.id;

  const pivot = await pivotService.getPivotById(userId, pivotId);

  res.status(200).send({
    message: 'Pivot successfully retrieved',
    pivot
  })
}

export async function updatePivot(
  req: Request<{ id: UUID }, any, PivotRequest>,
  res: Response<ApiResponse<Pivot, 'pivot'>>
): Promise<void> {
  const updatedPivotData = req.body;
  const userId = getRequestUserId(req);
  const pivotId = req.params.id;

  const updatedPivot = await pivotService.updatePivot(userId, pivotId, updatedPivotData);

  res.status(200).json({
    message: 'Pivot successfully updated',
    pivot: updatedPivot
  });
}

export async function deletePivot(
  req: Request<{ id: UUID }>,
  res: Response<ApiResponse<Pivot, 'deletedPivot'>>
): Promise<void> {
  const userId = getRequestUserId(req);
  const pivotId = req.params.id;

  const deletedPivot = await pivotService.deletePivot(userId, pivotId);

  res.status(200).json({
    message: 'Pivot successfully deleted',
    deletedPivot
  });
}