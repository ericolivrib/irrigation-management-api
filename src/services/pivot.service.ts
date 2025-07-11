import { randomUUID, UUID } from "node:crypto";
import { Pivot } from "../core/models/pivot.model";
import { PivotRequest } from "../schemas/pivot-request.dto";
import { NotFoundError } from "../core/errors/not-found.error";

const pivots: Pivot[] = [];

export async function createPivot(userId: UUID, newPivot: PivotRequest): Promise<Pivot> {
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

export async function getPivotById(userId: UUID, pivotId: UUID): Promise<Pivot> {
  const pivot = pivots.find(p => p.id === pivotId);

  if (!pivot || pivot.userId !== userId) {
    throw new NotFoundError('Pivot not found');
  }

  return pivot;
}

export async function updatePivot(userId: UUID, pivotId: UUID, updatedPivotData: PivotRequest): Promise<Pivot> {
  const pivot = await getPivotById(pivotId, userId);
  const pivotIndex = pivots.indexOf(pivot);

  pivots[pivotIndex] = {
    ...pivots[pivotIndex],
    ...updatedPivotData,
  }

  return pivots[pivotIndex];
}

export async function deletePivot(userId: UUID, pivotId: UUID): Promise<Pivot> {
  const pivot = await getPivotById(pivotId, userId);
  const [deletedPivot] = pivots.splice(pivots.indexOf(pivot), 1);

  return deletedPivot;
}