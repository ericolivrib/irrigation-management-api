import { Request, Response } from "express";
import { IrrigationRequest } from "./dtos/irrigation-request.dto";
import { ApiResponse } from "../../types/api-response";
import { Irrigation } from "../../common/models/irrigation.model";
import { getRequestUserId } from "../../helpers/get-request-user-id.helper";

import * as irrigationService from './irrigation.service';

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

export async function getUserIrrigations(): Promise<void> {}

export async function getIrrigationById(): Promise<void> {}

export async function deleteIrrigation(): Promise<void> {}