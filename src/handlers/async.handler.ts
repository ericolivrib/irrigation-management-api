import { Request, Response, NextFunction } from "express";

type MiddlewareFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: MiddlewareFn) =>
  (req: Request, res: Response, next: NextFunction): Promise<void> =>
    Promise.resolve(fn(req, res, next)).catch(next);