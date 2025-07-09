import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { BadRequestError } from "../common/errors/bad-request.error";

export function validateRequestBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      throw new BadRequestError('Campos inválidos', fieldErrors);
    }

    next();
  }
}