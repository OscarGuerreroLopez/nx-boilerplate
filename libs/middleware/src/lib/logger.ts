import { Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ErrorHandler, logger, Severity } from '@boilerplate/common';
import { CustomRequest } from './types';

export const LoggerMiddleware = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
): void => {
  try {
    request.code = uuidv4();
    const startTime = new Date().getTime();

    const logRequestTime = () => {
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;

      logger.info(`Request time: ${elapsedTime}ms`, {
        service: 'boilerplate',
        file: 'logger.ts',
        property: 'LoggerMiddleware',
        code: request.code,
        body: request.body,
        headers: request.headers,
        method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
      });
    };

    response.on('finish', logRequestTime);

    next();
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.ERROR,
        service: 'boilerplate',
        file: 'logger.ts',
        property: 'LoggerMiddleware',
        code: request.code,
        data: request.body,
        headers: request.headers,
      },
    });

    next();
  }
};
