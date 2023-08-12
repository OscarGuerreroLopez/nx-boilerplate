import { makeUser, User } from '../entities';
import { DbMethodsType } from '../infra/repo/dbMethods';
import { AddUser, MakePassword } from './interfaces';

export const MakeAddUser = (
  repo: DbMethodsType,
  makePassword: MakePassword
): AddUser => {
  const addUser = async (user: Partial<User>) => {
    const validUser = makeUser(user);

    const hashPassword = await makePassword(validUser.getPassword());

    const result = await repo('users').insert<User>({
      fname: validUser.getFname(),
      lname: validUser.getLname(),
      password: hashPassword,
      email: validUser.getEmail(),
      role: validUser.getRole(),
      userId: validUser.getUserId(),
      status: validUser.getUserStatus(),
    });

    if (!result) {
      throw new Error('Not able to insert user');
    }

    return true;
  };

  return addUser;
};
