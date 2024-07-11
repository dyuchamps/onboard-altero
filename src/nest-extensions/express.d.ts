import { Cashier } from 'src/domains/entities/cashier';
import { User } from 'src/domains/entities/user';

export interface JWTPayload {
  aud: Array<string>;
  sub: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    jwtPayload: JWTPayload;
    user?: User;
    cashier?: Cashier;
  }
}
