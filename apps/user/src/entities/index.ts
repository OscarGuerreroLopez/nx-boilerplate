export * from './interfaces';
import { buildMakeUser } from './buildMakeUser';
import { validateEmail, validatePassword, makeUUID } from '@boilerplate/common';

export const makeUser = buildMakeUser({
  validateEmail,
  validatePassword,
  makeUUID,
});
