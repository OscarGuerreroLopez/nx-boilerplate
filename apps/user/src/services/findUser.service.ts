import { User } from '../entities';
import { DbMethodsType, RepoNames } from '../infra/repo/dbMethods';

import { FindUsers, RemovePassword } from './interfaces';

export const MakeFindUser = (
  repo: DbMethodsType,
  removePassword: RemovePassword
): FindUsers => {
  const findUserByEmail = async (email: string) => {
    const result = removePassword(
      await repo(RepoNames.USERREPO).findOne<User>({ email })
    ) as Partial<User>;

    return result;
  };

  const findUserByUserId = async (userId: string) => {
    const result = removePassword(
      await repo(RepoNames.USERREPO).findOne<User>({ userId })
    ) as Partial<User>;

    return result;
  };

  const findAllUsers = async () => {
    const result = removePassword(
      await repo(RepoNames.USERREPO).find<User>({})
    ) as Partial<User>[];

    return result;
  };

  return { findUserByEmail, findAllUsers, findUserByUserId };
};
