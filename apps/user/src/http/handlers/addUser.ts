import { Handler, Response, Request } from 'express';
import { User } from '../../entities/interfaces';
import { AddUser } from '../../services';

export const adduserHandler: Handler = async (
  request: Request,
  response: Response
) => {
  try {
    const user: Partial<User> = request.body;

    const result = await AddUser(user);

    return response.status(200).send({
      result,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).send({ msg: 'bad request' });
  }
};
