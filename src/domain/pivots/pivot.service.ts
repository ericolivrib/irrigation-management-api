import { randomUUID, UUID } from "node:crypto";
import { Pivot } from "../../common/models/pivot.model";
import { PivotRequest } from "./dtos/pivot-request.dto";
import { NotFoundError } from "../../common/errors/not-found.error";
import { ForbiddenError } from "../../common/errors/forbidden.error";

const pivots: Pivot[] = [];

export async function createPivot(newPivot: PivotRequest, userId: UUID): Promise<Pivot> {
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

export async function updatePivot(pivotToUpdate: PivotRequest, pivotId: UUID, userId: UUID): Promise<Pivot> {
  const pivot = await getPivotById(pivotId, userId);
  const pivotIndex = pivots.indexOf(pivot);

  pivots[pivotIndex] = {
    ...pivots[pivotIndex],
    ...pivotToUpdate,
  }

  return pivots[pivotIndex];
}

export async function deletePivot(pivotId: UUID, userId: UUID): Promise<Pivot> {
  const pivot = await getPivotById(pivotId, userId);
  const [deletedPivot] = pivots.splice(pivots.indexOf(pivot), 1);

  return deletedPivot;
}