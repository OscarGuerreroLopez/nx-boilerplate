import { Response } from 'express';
import { logger } from '@boilerplate/common';
import { CustomRequest } from '../types';

export const exceptionMiddleware = (
  error: Error,
  request: CustomRequest,
  response: Response
): void => {
  const message = error.message || 'Something went wrong';
  const code = request.code;

  logger.error(message, {
    service: 'boilerplate',
    code,
    headers: request.headers,
    property: 'exceptionMiddleware',
    file: 'exception.middleware.ts',
    method: request.method,
    stack: error.stack,
  });

  response.status(500).send({
    message: 'Something went wrong, check logs',
    code,
  });
};
export default exceptionMiddleware;
