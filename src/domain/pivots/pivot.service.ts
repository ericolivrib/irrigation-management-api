import { randomUUID, UUID } from "node:crypto";
import { Pivot } from "../../common/models/pivot.model";
import { CreatePivotRequest } from "./dtos/create-pivot-request.dto";
import { CreatePivotResponse } from "./dtos/create-pivot-response.dto";
import { NotFoundError } from "../../common/errors/not-found.error";
import { ForbiddenError } from "../../common/errors/forbidden.error";

const pivots: Pivot[] = [];

export const pivotService = {
  createPivot: async (newPivot: CreatePivotRequest, userId: UUID): Promise<CreatePivotResponse> => {
    const pivot = {
      id: randomUUID(),
      description: newPivot.description,
      flowRate: newPivot.flowRate,
      minApplicationDepth: newPivot.minApplicationDepth,
      userId,
    }

    pivots.push(pivot);

    return pivot;
  },

  getUserPivots: async (userId: UUID): Promise<Pivot[]> => {
    const userPivots = pivots.filter(pivot => pivot.userId === userId);
    return userPivots;
  },

  getPivotById: async (pivotId: UUID, userId: UUID): Promise<Pivot> => {
    const pivot = pivots.find(p => p.id === pivotId);

    if (!pivot) {
      throw new NotFoundError(`Pivot not found with ID ${pivotId}`);
    }

    if (pivot.userId !== userId) {
      throw new ForbiddenError('Access denied');
    }

    return pivot;
  }
};