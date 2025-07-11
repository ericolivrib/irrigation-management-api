import { ErrorResponse } from "./response.error";

export class ForbiddenError extends ErrorResponse {
  constructor(message: string) {
    super(message, 403);
  }
}