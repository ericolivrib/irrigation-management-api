import { Request, Response, NextFunction } from "express";

import { ErrorResponse } from "../common/errors/response.error";
import { InternalServerError } from "../common/errors/internal-server.error";
import { ApiErrorResponse } from "../types/api-error-response";

function normalizeError(err: unknown): ErrorResponse {
  if (err instanceof ErrorResponse) {
    return err;
  }

  return new InternalServerError(err);
}

export const errorHandler = async (
  err: unknown,
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
): Promise<void> => {
  if (res.headersSent) {
    return next(err);
  }

  const error = normalizeError(err);
  res.status(error.statusCode).json(error.body)
}