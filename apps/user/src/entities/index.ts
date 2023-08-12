export * from './interfaces';
import { BuildMakeUser } from './buildMakeUser';
import { validateEmail, validatePassword, makeUUID } from '@boilerplate/common';

export const makeUser = BuildMakeUser({
  validateEmail,
  validatePassword,
  makeUUID,
});
