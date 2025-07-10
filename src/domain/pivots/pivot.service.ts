import { randomUUID, UUID } from "node:crypto";
import { Pivot } from "../../common/models/pivot.model";
import { CreatePivotRequest } from "./dtos/create-pivot-request.dto";
import { CreatePivotResponse } from "./dtos/create-pivot-response.dto";
import { NotFoundError } from "../../common/errors/not-found.error";
import { ForbiddenError } from "../../common/errors/forbidden.error";
import { UpdatePivotRequest } from "./dtos/update-pivot-request.dto";

const pivots: Pivot[] = [];

// export const pivotService: IPivotService = {
export async function createPivot(newPivot: CreatePivotRequest, userId: UUID): Promise<CreatePivotResponse> {
  const pivot = {
    id: randomUUID(),
    description: newPivot.description,
    flowRate: newPivot.flowRate,
    minApplicationDepth: newPivot.minApplicationDepth,
    userId,
  }

  pivots.push(pivot);

  return pivot;
}

export async function getUserPivots(userId: UUID): Promise<Pivot[]> {
  const userPivots = pivots.filter(pivot => pivot.userId === userId);
  return userPivots;
}

export async function getPivotById(pivotId: UUID, userId: UUID): Promise<Pivot> {
  const pivot = pivots.find(p => p.id === pivotId);

  if (!pivot) {
    throw new NotFoundError(`Pivot not found with ID ${pivotId}`);
  }

  if (pivot.userId !== userId) {
    throw new ForbiddenError('Access denied');
  }

  return pivot;
}

export async function updatePivot(pivotToUpdate: UpdatePivotRequest, pivotId: UUID, userId: UUID): Promise<Pivot> {
  const pivot = await getPivotById(pivotId, userId);
  const pivotIndex = pivots.indexOf(pivot);

  const updatedPivot = pivots[pivotIndex] = {
    ...pivots[pivotIndex],
    ...pivotToUpdate,
  }

  return updatedPivot;
}