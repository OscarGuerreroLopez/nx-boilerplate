import { Response, NextFunction } from 'express';
import { CustomRequest } from '@boilerplate/common';
import { validationResult } from 'express-validator';
import { ErrorHandler, Severity } from '@boilerplate/common';

export const ValidatorMiddleware = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    let message = '';

    errors.array().forEach((err) => {
      message += `${err.msg || ''} ,`;
    });

    ErrorHandler({
      error: new Error(message),
      additionalErrorInfo: {
        severity: Severity.WARN,
        service: 'boilerplate',
        file: 'validator.ts',
        function: 'ValidatorMiddleware',
        code: request.code,
        data: { body: request.body },
        headers: request.headers,
        method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
      },
    });

    return response.status(400).send({
      message: 'Wrong params, check logs',
      errorCode: request.code,
    });
  }

  next();
};
