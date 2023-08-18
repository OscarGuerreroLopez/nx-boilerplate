export * from './exception.middleware';
import { authCommon } from '@boilerplate/common';
import { MakeAuthUserMiddleware } from './userAuth.middleware';
import { MakeAdminAuthMiddleware } from './adminAuth.middleware';
import { findUserByUserId } from '../../services';

export const authUserMiddleware = MakeAuthUserMiddleware(
  authCommon,
  findUserByUserId
);

export const authAdminMiddleware = MakeAdminAuthMiddleware(
  authCommon,
  findUserByUserId
);
