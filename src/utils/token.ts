import * as jwt from 'jsonwebtoken';

export function signJWT(key: string, payload: any, expiresIn: string) {
  const token = jwt.sign(payload, key, { expiresIn });

  return token;
}
