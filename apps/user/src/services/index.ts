import { DbMethods } from '../infra/repo/dbMethods';
import { MakeAddUser } from './addUser.service';
import { BuildPassword, makeToken } from '@boilerplate/common';
import { MakeFindUser } from './findUser.service';
import { MakeLoginUser } from './loginUser.service';
export * from './interfaces';

const buildPassword = BuildPassword(10);
const removePassword = buildPassword.removePassword;

const makePassword = buildPassword.makePassword;

export const addUser = MakeAddUser(DbMethods, makePassword);

export const { findUserByEmail, findUserByUserId, findAllUsers } = MakeFindUser(
  DbMethods,
  removePassword
);

const comparePassword = buildPassword.comparePassword;

export const loginUser = MakeLoginUser({
  repo: DbMethods,
  comparePassword,
  makeToken,
});
