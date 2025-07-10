import { Request, Response } from "express";
import { IrrigationRequest } from "./dtos/irrigation-request.dto";
import { ApiResponse } from "../../types/api-response";
import { Irrigation } from "../../common/models/irrigation.model";
import { getRequestUserId } from "../../helpers/get-request-user-id.helper";

import * as irrigationService from './irrigation.service';
import { UUID } from "node:crypto";

export async function createIrrigation(
  req: Request<object, any, IrrigationRequest>,
  res: Response<ApiResponse<Irrigation, 'irrigation'>>
): Promise<void> {
  const newIrrigation = req.body;
  const userId = getRequestUserId(req);

  const createdIrrigation = await irrigationService.createIrrigation(newIrrigation, userId);

  res.status(201).json({
    message: 'Irrigation successful created',
    irrigation: createdIrrigation
  })
}

export async function getAllUserIrrigations(
  req: Request,
  res: Response<ApiResponse<Irrigation[], 'irrigations'>>
): Promise<void> {
  const userId = getRequestUserId(req);
  const userIrrigations = await irrigationService.getAllUserIrrigations(userId);

  res.status(200).json({
    message: userIrrigations.length == 0
      ? 'User does not have registered irrigations'
      : 'User irrigations successful retrieved',
    irrigations: userIrrigations
  });
}

export async function getIrrigationById(
  req: Request<{ id: UUID }>,
  res: Response<ApiResponse<Irrigation, 'irrigation'>>
): Promise<void> {
  const userId = getRequestUserId(req);
  const irrigationId = req.params['id'];

  const irrigation = await irrigationService.getUserIrrigationById(irrigationId, userId);

  res.status(200).json({
    message: 'Irrigation successful retrieved',
    irrigation
  });
}

export async function deleteIrrigation(
  req: Request<{ id: UUID }>,
  res: Response<ApiResponse<Irrigation, 'deletedIrrigation'>>
): Promise<void> {
  const userId = getRequestUserId(req);
  const irrigationId = req.params['id'];

  const deletedIrrigation = await irrigationService.deleteIrrigation(irrigationId, userId);

  res.status(200).json({
    message: 'Irrigation successful deleted',
    deletedIrrigation
  });
}