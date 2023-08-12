import { authCommon } from '@boilerplate/common';
import { MakeAuthUserMiddleware } from './userAuth.middleware';
import { findUserByUserId } from '../../services';

export const authUserMiddleware = MakeAuthUserMiddleware(
  authCommon,
  findUserByUserId
);
