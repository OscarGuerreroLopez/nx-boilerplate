import {
  AccountLockError,
  AuthCommonType,
  ErrorHandler,
  Severity,
  UnauthorizeError,
  UserNotFoundError,
} from '@boilerplate/common';
import { NextFunction, Response } from 'express';
import { FindUserByUserIdType } from '../../services/interfaces';
import { StatusEnum } from '../../entities';
import { CustomRequest } from '../types';

export const MakeAuthUserMiddleware = (
  authCommon: AuthCommonType,
  findUserByUserId: FindUserByUserIdType
) => {
  const authUserMiddleware = async (
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ) => {
    const { code, clientIp } = request;

    try {
      const token = request.headers.authorization.split(' ')[1];
      const userAgent = request.headers['user-agent'];
      const decodedToken = authCommon(token, userAgent, clientIp);

      const user = await findUserByUserId(decodedToken.id);

      if (Object.keys(user).length === 0) {
        throw new UserNotFoundError(
          `User ${decodedToken.id} does not exist in DB`
        );
      }
      if (user.status !== StatusEnum.ACTIVE) {
        throw new AccountLockError(`User ${user.userId} is not active `);
      }
      // in case user role has chnaged since token creation
      if (decodedToken.role !== user.role) {
        throw new UnauthorizeError(
          `user in the token has role ${decodedToken.role} and in the DB ${user.role} `
        );
      }

      if (
        decodedToken.userAgent !== userAgent ||
        decodedToken.clientIp !== clientIp
      ) {
        throw new UnauthorizeError(
          `User ${decodedToken.id} has changed location`
        );
      }

      request.user = {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        userId: user.userId,
      };

      next();
    } catch (error) {
      ErrorHandler({
        error,
        additionalErrorInfo: {
          severity: Severity.WARN,
          service: 'boilerplate',
          file: 'userAuth.middleware.ts',
          property: 'authUserMiddleware',
          code: request.code,
          body: request.body,
          headers: request.headers,
          method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
        },
      });
      response.status(401).send({ message: 'Not Authorized', code });
    }
  };

  return authUserMiddleware;
};
