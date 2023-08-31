import { makeUser, StatusEnum, User } from '../entities';
import { DbMethodsType, RepoNames } from '../infra/repo/dbMethods';
import { AddUser, MakePassword } from './interfaces';

export const MakeAddUser = (
  repo: DbMethodsType,
  makePassword: MakePassword
): AddUser => {
  const addUser = async (user: Partial<User>) => {
    const validUser = makeUser(user);

    const hashPassword = await makePassword(validUser.getPassword());

    await repo(RepoNames.USERREPO).insert<User>({
      fname: validUser.getFname(),
      lname: validUser.getLname(),
      password: hashPassword,
      email: validUser.getEmail(),
      role: validUser.getRole(),
      userId: validUser.getUserId(),
      status: StatusEnum.ACTIVE,
      failedAttempts: validUser.getFailedAttempts(),
    });

    return true;
  };

  return addUser;
};
