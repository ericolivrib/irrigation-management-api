import { ErrorResponse } from "./response.error";

export class ConflictError extends ErrorResponse {
  constructor(message: string) {
    super(message, 409);
  }
}