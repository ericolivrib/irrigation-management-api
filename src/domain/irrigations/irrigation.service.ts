import { randomUUID, UUID } from "node:crypto";
import { Irrigation } from "../../common/models/irrigation.model";
import { IrrigationRequest } from "./dtos/irrigation-request.dto";

import * as pivotService from '../pivots/pivot.service';

const irrigations: Map<UUID, Irrigation> = new Map();

export async function createIrrigation(newIrrigation: IrrigationRequest, userId: UUID): Promise<Irrigation> {
  const pivot = await pivotService.getPivotById(newIrrigation.pivotId as UUID, userId);

  const irrigation: Irrigation = {
    id: randomUUID(),
    userId,
    pivotId: pivot.id,
    applicationAmount: newIrrigation.applicationAmount,
    irrigationDate: newIrrigation.irrigationDate
  }

  irrigations.set(irrigation.id, irrigation);
  return irrigation;
}

export async function getAllUserIrrigations(userId: UUID): Promise<Irrigation[]> {
  const userIrrigations = Array.from(irrigations.values()).filter(value => value.userId === userId);
  return userIrrigations;
}

