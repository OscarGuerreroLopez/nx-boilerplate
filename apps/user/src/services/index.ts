import { DbMethods } from '../infra/repo/dbMethods';
import { MakeAddUser } from './addUser.service';
import { BuildPassword, MakeToken } from '@boilerplate/common';
import { MakeFindUser } from './findUser.service';
import { MakeLoginUser } from './loginUser.service';

const buildPassword = BuildPassword(10);
const removePassword = buildPassword.removePassword;

const makePassword = buildPassword.makePassword;

export const AddUser = MakeAddUser(DbMethods, makePassword);

export const {
  findUserByEmail: FindUserByEMail,
  findUserByUserId: FindUserByUserId,
  findAllUsers: FindAllUsers,
} = MakeFindUser(DbMethods, removePassword);

const comparePassword = buildPassword.comparePassword;

export const LoginUser = MakeLoginUser({
  repo: DbMethods,
  comparePassword,
  MakeToken,
});
