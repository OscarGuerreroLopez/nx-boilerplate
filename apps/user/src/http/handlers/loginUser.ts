import { Handler, Response } from 'express';
import { loginUser } from '../../services';
import { CustomRequest, ErrorHandler, Severity } from '@boilerplate/common';

export const loginUserHandler: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const params = {
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

    return response.status(500).send({
      message: 'Login issue, check logs',
      code: request.code,
    });
  }
};
