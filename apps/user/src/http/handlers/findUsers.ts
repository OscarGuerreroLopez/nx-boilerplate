import { Handler, Response } from 'express';
import { CustomRequest } from '@boilerplate/common';
import qs from 'qs';
import {
  FindAllUsers,
  FindUserByEMail,
  FindUserByUserId,
} from '../../services';

export const findUserHandler: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const email = request.query.email as string;
    const userId = request.query.userId as string;

    let result;

    if (!email && !userId) {
      throw new Error('Invalid query params');
    }

    if (email) {
      result = await FindUserByEMail(email);
    }

    if (userId) {
      result = await FindUserByUserId(userId);
    }

    return response.status(200).send({
      result,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).send({ msg: 'bad request' });
  }
};

export const findAllUsersHandler: Handler = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    const result = await FindAllUsers();

    return response.status(200).send({
      result,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).send({ msg: 'bad request' });
  }
};
