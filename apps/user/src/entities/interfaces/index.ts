export interface UserEntity {
  getFname: () => string;
  getLname: () => string;
  getEmail: () => string;
  getPassword: () => string;
  getRole: () => RoleTypeEnum;
  getUserId: () => string;
}

export interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
  role: RoleTypeEnum;
  userId: string;
}

export enum RoleTypeEnum {
  USER = 'User',
  ADMIN = 'Admin',
  GUESS = 'Guess',
}

export interface BuildMakeUserParams {
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
  makeUUID: () => string;
}
export type MakeUser = (user: Partial<User>) => Readonly<UserEntity>;

export type BuildMakeUser = (BuildMakeUserParams) => MakeUser;
