import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../env/jwt.env";
import { UnauthorizedError } from "../errors/unauthorized.error";
import * as authService from "../services/auth.service";
import { UUID } from "node:crypto";
import { JwtPayload } from "jsonwebtoken";

export async function verifyJwt(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = extractToken(req);

  if (!token) {
    throw new UnauthorizedError('Token not provided');
  }
  
  let userId: UUID;

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      throw new UnauthorizedError('Invalid token');
    }

    userId = (<JwtPayload>payload).sub as UUID;
  });

  const user = await authService.getUserById(userId);

  if (!user) {
    throw new UnauthorizedError('Unauthorized');
  }
  
  req['user'] = user;
  next();
}

function extractToken(req: Request): string | null {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer')) {
    return null;
  }

  return token.split(' ')[1];
}