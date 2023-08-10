export * from './validateEnv';
export * from './validateEmail';
export * from './validatePassword';
export * from './makeUUID';
export * from './logger';
export * from './password';
export * from './bodySanitation';
export * from './errorHandler';
export * from './types';
import { BuildMakeVerifyJwt } from './jwt';

const buildJwt = BuildMakeVerifyJwt.getInstance();
export const MakeToken = buildJwt.makeToken;
export const VerifyToken = buildJwt.verifyToken;

export function common(): string {
  return 'common';
}
