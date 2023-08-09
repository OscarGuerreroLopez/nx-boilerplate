import { Handler, Response } from 'express';
import { CustomRequest, ErrorHandler, Severity } from '@boilerplate/common';
import { User } from '../../entities/interfaces';
import { AddUser } from '../../services';

export const adduserHandler: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const user: Partial<User> = request.body;

    const result = await AddUser(user);

    return response.status(200).send({
      result,
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        service: 'boilerplate',
        file: 'addUser.ts',
        property: 'adduserHandler',
        code: request.code,
        body: request.body,
        headers: request.headers,
        method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
      },
    });
    return response
      .status(400)
      .send({ msg: 'bad request', code: request.code });
  }
};
