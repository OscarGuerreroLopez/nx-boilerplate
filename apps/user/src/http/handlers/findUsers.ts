import { Handler, Response } from 'express';
import { CustomRequest, ErrorHandler, Severity } from '@boilerplate/common';
import {
  findAllUsers,
  findUserByEmail,
  findUserByUserId,
} from '../../services';
import { RoleTypeEnum } from '../../entities';

export const findUserHandler: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const email = request.query.email as string;
    const userId = request.query.userId as string;

    const user = request.user;

    let result;

    if (!email && !userId) {
      throw new Error('Invalid query params');
    }

    const isAdminOrUser =
      user.role === RoleTypeEnum.ADMIN ||
      user.email === email ||
      user.userId === userId;

    if (email && isAdminOrUser) {
      result = await findUserByEmail(email);
    } else if (userId && isAdminOrUser) {
      result = await findUserByUserId(userId);
    } else {
      throw new Error(
        `User ${user.userId} is trying to access information for user ${
          email || userId
        }`
      );
    }

    return response.status(200).send({
      result,
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.ERROR,
        service: 'boilerplate',
        file: 'findUsers.ts',
        property: 'findUserHandler',
        code: request.code,
        body: request.body,
        headers: request.headers,
        method: `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`,
      },
    });
    return response.status(400).send({ msg: 'bad request' });
  }
};

export const findAllUsersHandler: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const result = await findAllUsers();

    return response.status(200).send({
      result,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).send({ msg: 'bad request' });
  }
};
