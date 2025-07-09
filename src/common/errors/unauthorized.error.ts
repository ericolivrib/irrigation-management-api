import { ErrorResponse } from "./response.error";

export class UnauthorizedError extends ErrorResponse {
  constructor(message: string) {
    super(message, 401);
  }
}