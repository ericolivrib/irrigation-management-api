import { ErrorResponse } from "./response.error";

export class NotFoundError extends ErrorResponse {
  constructor(message: string) {
    super(message, 404);
  }
}