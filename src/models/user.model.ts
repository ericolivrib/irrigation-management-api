import { UUID } from "node:crypto";

export class User {
  id: UUID;
  username: string;
  password: string;
}