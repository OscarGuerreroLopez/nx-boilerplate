import { User } from '../entities';
import { IObjectLiteral } from '@boilerplate/common';

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
