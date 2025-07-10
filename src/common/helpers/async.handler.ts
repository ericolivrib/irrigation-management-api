import { Request, Response, NextFunction } from "express";

export type ControllerFn = (req: Request, res: Response) => Promise<void>;

export function handleAsync(fn: ControllerFn) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next)
  };
}