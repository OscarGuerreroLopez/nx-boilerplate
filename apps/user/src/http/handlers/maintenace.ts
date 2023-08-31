import { Handler, Response } from 'express';
import fs from 'fs';
import heapdump from 'heapdump';
import { ErrorHandler, Severity } from '@boilerplate/common';
import { CustomRequest } from '../types';

export const maintenance: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    heapdump.writeSnapshot((err, filename) => {
      console.log('heapdump file is ready to be sent to the caller', filename);
      fs.readFile(filename, 'utf-8', (err, data) => {
        response.end(data);
      });
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        service: 'boilerplate',
        file: 'maintenance.ts',
        property: 'maintenance',
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
