import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  ErrorHandler,
  boilerplateLogger,
  Severity,
  CustomRequest,
} from '@boilerplate/common';

export const LoggerMiddleware = (
  request: CustomRequest,
  _response: Response,
  next: NextFunction
): void => {
  try {
    request.code = uuidv4();

    boilerplateLogger.info('Logger middleware', {
      service: 'boilerplate',
      file: 'logger.ts',
      function: 'LoggerMiddleware',
      code: request.code,
      body: request.body,
      headers: request.headers,
      method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
    });

    next();
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.ERROR,
        service: 'boilerplate',
        file: 'logger.ts',
        function: 'LoggerMiddleware',
        code: request.code,
        data: request.body,
        headers: request.headers,
      },
    });

    next();
  }
};
