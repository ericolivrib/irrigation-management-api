import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/api-response";
import { ErrorResponse } from "../common/errors/response.error";
import { InternalServerError } from "../common/errors/internal-server.error";
import { ApiErrorResponse } from "../types/api-error-response";

function normalizeError(err: unknown): ErrorResponse {
  if (err instanceof ErrorResponse) {
    return err;
  }

  return new InternalServerError('An unexpected error occurred');
}

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
): Promise<void> => {
  if (res.headersSent) {
    return next(err);
  }

  const error = normalizeError(err);
  res.status(500).json({ message: err.message })
}