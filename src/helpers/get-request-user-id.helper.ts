import { Request } from 'express';
import { UUID } from "crypto";
import { JwtPayload } from '../types/jwt-payload';

export function getRequestUserId(req: Request): UUID {
  return (<JwtPayload>req['user']).sub;
}