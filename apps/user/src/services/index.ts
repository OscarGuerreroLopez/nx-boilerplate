import { DbMethods } from '../infra/repo/dbMethods';
import { MakeAddUser } from './addUser.service';
import { BuildPassword } from '@boilerplate/common';

const buildPassword = BuildPassword(10);
const makePassword = buildPassword.makePassword;

export const AddUser = MakeAddUser(DbMethods, makePassword);
