import { ErrorResponse } from "./response.error";

export class InternalServerError extends ErrorResponse {
  constructor(message: string) {
    console.error(message);
    super(message, 500);
  }
}