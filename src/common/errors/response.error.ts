import { ApiErrorResponse } from "../../types/api-error-response";
import { ApiResponse } from "../../types/api-response";

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