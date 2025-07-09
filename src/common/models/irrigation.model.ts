import { UUID } from "node:crypto";

export class Irrigation {
  id: UUID;
  pivotId: UUID;
  applicationAmount: number;
  irrigationDate: Date;
  userId: UUID;
}