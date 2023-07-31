import { Handler, Response, Request } from 'express';
import { User } from '../../entities/interfaces';

export const adduserHandler: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const user: Partial<User> = request.body;

    return response.status(201).send({ ...user, role: 'user', userId: '1234' });
  } catch (error) {
    console.error(error);
  }
};
