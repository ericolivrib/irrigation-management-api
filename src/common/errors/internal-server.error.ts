import { ErrorResponse } from "./response.error";

export class InternalServerError extends ErrorResponse {
  constructor(err: unknown) {
    super('An unexpected error occurred', 500);
    console.error(err);
  }
}