import { User } from '../entities';
import { RepoNames } from '../infra/repo/dbMethods';
import { LoginUser, LoginUserParams, MakeLoginUserParams } from './interfaces';
import { AppError, CommomErrors } from '@boilerplate/common';

export const MakeLoginUser = ({
  repo,
  comparePassword,
  makeToken,
}: MakeLoginUserParams): LoginUser => {
  const loginUser = async ({
    email,
    password,
    userAgent,
    clientIp,
  }: LoginUserParams) => {
    const user = await repo(RepoNames.USERREPO).findOne<User>({ email: email });

    if (!(Object.keys(user).length > 0)) {
      throw new AppError(
        CommomErrors.USER_NOT_FOUND,
        `User with email ${email} does not exists`
      );
    }

    if (user.failedAttempts >= 3) {
      throw new AppError(
        CommomErrors.USER_LOCKED,
        `User ${user.userId} is blocked`
      );
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      await repo(RepoNames.USERREPO).updateOne<User>(
        { userId: user.userId },
        { failedAttempts: user.failedAttempts + 1 }
      );
      throw new AppError(CommomErrors.BAD_PASSWORD, 'password mismatch');
    }

    if (user.failedAttempts !== 0) {
      await repo(RepoNames.USERREPO).updateOne<User>(
        { userId: user.userId },
        { failedAttempts: 0 }
      );
    }

    const token = makeToken({
      id: user.userId,
      role: user.role,
      userAgent,
      clientIp,
    });
    return token;
  };

  return loginUser;
};
