import { ApiErrorResponse } from "../schemas/api-error-response.dto";

export class ErrorResponse extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  get body(): ApiErrorResponse {
    return {
      message: this.message,
    }
  }
}