import { UUID } from "node:crypto";

export interface RegisterUserResponse {
  id: UUID;
  username: string;
}