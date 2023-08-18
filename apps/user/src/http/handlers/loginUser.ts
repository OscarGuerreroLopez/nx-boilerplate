import { Handler, Response } from 'express';
import { LoginUserParams, loginUser } from '../../services';
import {
  AccountLockError,
  BadPasswordError,
  ErrorHandler,
  Severity,
} from '@boilerplate/common';
import { CustomRequest } from '../types';

export const loginUserHandler: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const params: LoginUserParams = {
      ...request.body,
      userAgent: request.headers['user-agent'],
      clientIp: request.clientIp,
    };

    const token = await loginUser(params);

    if (!token) {
      throw Error('Error login check logs');
    }

    return response.status(200).send({
      token,
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        service: 'boilerplate',
        file: 'loginUser.ts',
        property: 'loginUserHandler',
        code: request.code,
        body: request.body,
        headers: request.headers,
        method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
      },
    });

    if (error instanceof AccountLockError) {
      return response.status(error.status).send({
        message: 'Locked Account',
        code: request.code,
      });
    }

    if (error instanceof BadPasswordError) {
      return response.status(error.status).send({
        message: 'Issue with the login',
        code: request.code,
      });
    }

    return response.status(400).send({
      message: 'Login issue, check logs',
      code: request.code,
    });
  }
};
