import { User } from '../entities';
import { LoginUser, LoginUserParams, MakeLoginUserParams } from './interfaces';
import { AccountLockError, BadPasswordError } from '@boilerplate/common';

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
      throw new Error(`User with email ${email} does not exists`);
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
      throw new BadPasswordError(`User with email ${email} wrong password`);
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
