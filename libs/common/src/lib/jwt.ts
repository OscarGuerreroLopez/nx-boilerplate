import jwt from 'jsonwebtoken';
import { EnvVars } from './validateEnv';
import { MakeJwt, TokenPayload } from './types';

export const BuildMakeVerifyJwt = (): MakeJwt => {
  const secret = EnvVars.SECRET;

  const makeToken = (data: TokenPayload) => {
    const token = jwt.sign({ ...data }, secret, { expiresIn: '24d' });

    return token;
  };

  const verifyToken = (token: string): TokenPayload => {
    const decoded = jwt.verify(token, secret);

    return decoded as TokenPayload;
  };

  return { makeToken, verifyToken };
};
