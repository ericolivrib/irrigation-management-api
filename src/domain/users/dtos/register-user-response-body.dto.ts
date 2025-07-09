import { UUID } from "node:crypto";

export interface RegisterUserResponseBody {
  id: UUID;
  username: string;
}