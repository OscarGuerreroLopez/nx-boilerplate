import { DbMethods } from '../infra/repo/dbMethods';
import { MakeAddUser } from './addUser.service';
import { BuildPassword } from '@boilerplate/common';
import { MakeFindUser } from './findUser.service';

const buildPassword = BuildPassword(10);
const removePassword = buildPassword.removePassword;

const makePassword = buildPassword.makePassword;

export const AddUser = MakeAddUser(DbMethods, makePassword);

export const {
  findUserByEmail: FindUserByEMail,
  findUserByUserId: FindUserByUserId,
  findAllUsers: FindAllUsers,
} = MakeFindUser(DbMethods, removePassword);
