import { User } from '../entities';
import {
  ComparePassword,
  IObjectLiteral,
  MakeTokenType,
} from '@boilerplate/common';
import { DbMethodsType } from '../infra/repo/dbMethods';

export type AddUser = (user: Partial<User>) => Promise<boolean>;
export type MakePassword = (plainPassword: string) => Promise<string>;
export type FindUserByEmail = (email: string) => Promise<Partial<User>>;
export type FindUserByUserIdType = (id: string) => Promise<Partial<User>>;
export type FindAllUsers = () => Promise<Partial<User>[]>;

export type RemovePassword = <T>(
  items: T | T[]
) => IObjectLiteral[] | IObjectLiteral;

export interface FindUsers {
  findUserByEmail: FindUserByEmail;
  findUserByUserId: FindUserByUserIdType;
  findAllUsers: FindAllUsers;
}

export interface LoginUserParams {
  email: string;
  password: string;
  userAgent: string;
  clientIp: string;
}
export type LoginUser = (params: LoginUserParams) => Promise<string>;

export interface MakeLoginUserParams {
  repo: DbMethodsType;
  comparePassword: ComparePassword;
  MakeToken: MakeTokenType;
}
