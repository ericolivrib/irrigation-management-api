import { UUID } from "node:crypto";

export class Pivot {
  id: UUID;
  description: string;
  flowRate: number;
  minApplicationDepth: number;
  userId: UUID;
}