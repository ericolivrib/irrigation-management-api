import { UUID } from "crypto";

export type JwtPayload = {
  iss: string,
  sub: UUID,
  jti: UUID,
  iat: Date;
  exp: Date;
}