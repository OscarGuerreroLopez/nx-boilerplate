import jwt from 'jsonwebtoken';
import { EnvVars } from './validateEnv';
import { MakeJwt, TokenPayload } from './types';

export const BuildMakeVerifyJwt = (() => {
  const secret = EnvVars.SECRET;

  let instance: MakeJwt;

  const createInstance = () => {
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

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
})();
