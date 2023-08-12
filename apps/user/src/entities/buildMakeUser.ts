import {
  BuildMakeUser as BuildMakeUserType,
  MakeUser,
  RoleTypeEnum,
} from './interfaces';

export const BuildMakeUser: BuildMakeUserType = (params) => {
  const { validateEmail, validatePassword, makeUUID } = params;

  const makeUser: MakeUser = (user) => {
    if (!user.fname || !user.lname || !user.email || !user.password) {
      throw new Error('Missing user params');
    }

    const isValidEmail = validateEmail(user.email);
    const isValidPassword = validatePassword(user.password);

    if (!isValidEmail) {
      throw new Error('Invalid email');
    }

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    if (!user.userId) {
      user.userId = makeUUID();
    }

    if (!user.role) {
      user.role = RoleTypeEnum.GUESS;
    }

    return Object.freeze({
      getFname: () => user.fname,
      getLname: () => user.lname,
      getEmail: () => user.email,
      getPassword: () => user.password,
      getRole: () => user.role,
      getUserId: () => user.userId,
    });
  };

  return makeUser;
};
