import { randomUUID, UUID } from "node:crypto";
import { Irrigation } from "../models/irrigation.model";
import { IrrigationRequest } from "../schemas/irrigation-request.dto";

import * as pivotService from '../services/pivot.service';
import { NotFoundError } from "../errors/not-found.error";

const irrigations: Map<UUID, Irrigation> = new Map();

export async function createIrrigation(userId: UUID, newIrrigation: IrrigationRequest): Promise<Irrigation> {
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

export async function getUserIrrigationById(userId: UUID, irrigationId: UUID): Promise<Irrigation> {
  const irrigation = irrigations.get(irrigationId);

  if (!irrigation || irrigation.userId !== userId) {
    throw new NotFoundError('Irrigation not found');
  }

  return irrigation;
}

export async function deleteIrrigation(userId: UUID, irrigationId: UUID): Promise<Irrigation> {
  const irrigation = await getUserIrrigationById(irrigationId, userId);
  
  irrigations.delete(irrigation.id);
  return irrigation;
}

