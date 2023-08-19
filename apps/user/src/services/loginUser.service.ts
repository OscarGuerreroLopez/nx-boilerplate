import { User } from '../entities';
import { LoginUser, LoginUserParams, MakeLoginUserParams } from './interfaces';
import {
  AccountLockError,
  UnauthorizeError,
  UserNotFoundError,
} from '@boilerplate/common';

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
    const user = await repo('users').findOne<User>({ email: email });

    if (!(Object.keys(user).length > 0)) {
      throw new UserNotFoundError(`User with email ${email} does not exists`);
    }

    if (user.failedAttempts >= 3) {
      throw new AccountLockError(`User ${user.userId} is blocked`);
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      await repo('users').updateOne<User>(
        { userId: user.userId },
        { failedAttempts: user.failedAttempts + 1 }
      );
      throw new UnauthorizeError(`User with email ${email} wrong password`);
    }

    if (user.failedAttempts !== 0) {
      await repo('users').updateOne<User>(
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
