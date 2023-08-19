import {
  BuildMakeUser as BuildMakeUserType,
  MakeUser,
  RoleTypeEnum,
} from './interfaces';
import { MakeUseError } from '@boilerplate/common';

export const BuildMakeUser: BuildMakeUserType = (params) => {
  const { validateEmail, validatePassword, makeUUID } = params;

  const makeUser: MakeUser = (user) => {
    if (!user.fname || !user.lname || !user.email || !user.password) {
      throw new MakeUseError('Missing user params');
    }

    const isValidEmail = validateEmail(user.email);
    const isValidPassword = validatePassword(user.password);

    if (!isValidEmail) {
      throw new MakeUseError('Invalid email');
    }

    if (!isValidPassword) {
      throw new MakeUseError('Invalid password');
    }

    if (!user.userId) {
      user.userId = makeUUID();
    }

    if (!user.role) {
      user.role = RoleTypeEnum.GUESS;
    }

    if (!user.failedAttempts) {
      user.failedAttempts = 0;
    }

    return Object.freeze({
      getFname: () => user.fname,
      getLname: () => user.lname,
      getEmail: () => user.email,
      getPassword: () => user.password,
      getRole: () => user.role,
      getUserId: () => user.userId,
      getUserStatus: () => user.status,
      getFailedAttempts: () => user.failedAttempts,
    });
  };

  return makeUser;
};
