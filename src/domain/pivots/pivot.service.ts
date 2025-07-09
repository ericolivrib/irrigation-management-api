import { randomUUID, UUID } from "node:crypto";
import { Pivot } from "../../common/models/pivot.model";
import { CreatePivotRequest } from "./dtos/create-pivot-request.dto";
import { CreatePivotResponse } from "./dtos/create-pivot-response.dto";

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
};