import { NextFunction, Response } from 'express';
import { FindUserByUserIdType } from '../../services/interfaces';
import {
  AuthCommonType,
  CustomRequest,
  ErrorHandler,
  Severity,
} from '@boilerplate/common';
import { RoleTypeEnum } from '../../entities';

export const MakeAdminAuthMiddleware = (
  authCommon: AuthCommonType,
  findUserByUserId: FindUserByUserIdType
) => {
  const adminAuthMiddleware = async (
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
        throw new Error(`User ${decodedToken.id} does not exist in DB`);
      }
      // in case user role has chnaged since token creation
      if (decodedToken.role !== user.role) {
        throw new Error(
          `user in the token has role ${decodedToken.role} and in the DB ${user.role} `
        );
      }

      if (
        decodedToken.userAgent !== userAgent ||
        decodedToken.clientIp !== clientIp
      ) {
        throw new Error(`User ${decodedToken.id} has changed location`);
      }

      if (user.role !== RoleTypeEnum.ADMIN) {
        throw new Error(`User ${user.userId} tried to execute an admin route`);
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
          file: 'adminAuth.middleware.ts',
          property: 'adminAuthMiddleware',
          code: request.code,
          body: request.body,
          headers: request.headers,
          method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
        },
      });
      response.status(401).send({ message: 'Not Authorized', code });
    }
  };

  return adminAuthMiddleware;
};
