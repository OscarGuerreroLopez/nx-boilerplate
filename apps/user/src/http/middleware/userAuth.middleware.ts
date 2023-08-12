import {
  AuthCommonType,
  CustomRequest,
  ErrorHandler,
  Severity,
} from '@boilerplate/common';
import { NextFunction, Response } from 'express';
import { FindUserByUserIdType } from '../../services/interfaces';

export const MakeAuthUserMiddleware = (
  authCommon: AuthCommonType,
  findUserByUserId: FindUserByUserIdType
) => {
  const authUserMiddleware = async (
    request: CustomRequest,
    response: Response,
    next: NextFunction
  ) => {
    const code = request.code;

    try {
      const token = request.headers.authorization.split(' ')[1];
      const userAgent = request.headers['user-agent'];
      const clientIp = request.clientIp;

      const decodedToken = authCommon(token, userAgent, clientIp);

      const user = await findUserByUserId(decodedToken.id);

      if (Object.keys(user).length === 0) {
        throw Error(`User ${decodedToken.id} does not exist in DB`);
      }

      // in case user role has chnaged since token creation
      if (decodedToken.role !== user.role) {
        throw Error(
          `user in the token has role ${decodedToken.role} and in the DB ${user.role} `
        );
      }

      if (
        decodedToken.userAgent !== userAgent ||
        decodedToken.clientIp !== clientIp
      ) {
        throw Error(`User ${decodedToken.id} has changed location`);
      }

      if (!user.fname || !user.lname) {
        throw new Error('incomplite user in DB');
      }

      if (!user.email) {
        throw new Error('email missing in user DB');
      }

      if (!user.userId) {
        throw new Error('userId missing in user DB');
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
