import { Request } from 'express';
import { UUID } from "crypto";
import { User } from '../core/models/user.model';

export function getRequestUserId(req: Request<object, any, any, object, Record<string, any>>): UUID {
  return (<User>req['user']).id;
}