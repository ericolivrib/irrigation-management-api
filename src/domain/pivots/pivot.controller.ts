import { Request, Response } from 'express';
import { PivotRequest } from './dtos/pivot-request.dto';
import { ApiResponse } from '../../types/api-response';
import * as pivotService from './pivot.service';
import { Pivot } from '../../common/models/pivot.model';
import { getRequestUserId } from '../../common/helpers/get-request-user-id.helper';
import { UUID } from 'node:crypto';

export async function createPivot(
  req: Request<object, any, PivotRequest>,
  res: Response<ApiResponse<Pivot, 'pivot'>>
) {
  const requestBody = req.body;
  const userId = getRequestUserId(req);

  const createdPivot = await pivotService.createPivot(requestBody, userId);

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
    message: 'Pivots successful retrieved',
    pivots
  })
}

export async function getPivotById(
  req: Request<{ id: UUID }>,
  res: Response<ApiResponse<Pivot, 'pivot'>>
): Promise<void> {
  const userId = getRequestUserId(req);
  const pivotId = req.params.id;

  const pivot = await pivotService.getPivotById(pivotId, userId);

  res.status(200).send({
    message: 'Pivot successful retrieved',
    pivot
  })
}

export async function updatePivot(
  req: Request<{ id: UUID }, any, PivotRequest>,
  res: Response<ApiResponse<Pivot, 'pivot'>>
): Promise<void> {
  const requestPivot = req.body;
  const userId = getRequestUserId(req);
  const pivotId = req.params.id;

  const updatedPivot = await pivotService.updatePivot(requestPivot, pivotId, userId);

  res.status(200).json({
    message: 'Pivot successful updated',
    pivot: updatedPivot
  });
}

export async function deletePivot(
  req: Request<{ id: UUID }>,
  res: Response<ApiResponse<Pivot, 'deletedPivot'>>
): Promise<void> {
  const userId = getRequestUserId(req);
  const pivotId = req.params.id;

  const deletedPivot = await pivotService.deletePivot(pivotId, userId);

  res.status(200).json({
    message: 'Pivot successful deleted',
    deletedPivot
  });
}