import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../env/jwt.env";
import { UnauthorizedError } from "../common/errors/unauthorized.error";

export function verifyJwt(req: Request, res: Response, next: NextFunction): void {
  const token = extractToken(req);

  if (!token) {
    throw new UnauthorizedError('Token not provided');
  }
  
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      throw new UnauthorizedError('Invalid token');
    }

    req['user'] = payload;
  });

  next();
}

function extractToken(req: Request): string | null {
  const token = req.headers['authorization'];

  if (!token) {
    return null;
  }

  return token.replace('Bearer', '').trim();
}