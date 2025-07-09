import { ApiErrorResponse } from "../../types/api-error-response";
import { ErrorResponse } from "./response.error";

export class BadRequestError extends ErrorResponse {
  fieldErrors: Record<string, string[]>;
  constructor(message: string, fieldErrors: Record<string, string[]>) {
    super(message, 400);
    this.fieldErrors = fieldErrors;
  }

  get body(): ApiErrorResponse {
    return {
      message: this.message,
      fieldErrors: this.fieldErrors,
    };
  }
}