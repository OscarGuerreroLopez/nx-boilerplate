import { Handler, Response } from 'express';
import { ErrorHandler, Severity } from '@boilerplate/common';
import { CustomRequest } from '../types';

export const meta: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    return response.status(200).send({
      message: 'I am alive',
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        service: 'boilerplate',
        file: 'meta.ts',
        property: 'meta',
        code: request.code,
        body: request.body,
        headers: request.headers,
        method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
      },
    });

    return response.status(500).send({
      message: 'Health route not working, check logs',
    });
  }
};
