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
import { AuthCommon } from './authCommon';

const buildJwt = BuildMakeVerifyJwt();
export const makeToken = buildJwt.makeToken;
export const verifyToken = buildJwt.verifyToken;
export const authCommon = AuthCommon(verifyToken);
