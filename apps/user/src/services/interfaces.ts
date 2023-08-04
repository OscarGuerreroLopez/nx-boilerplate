import { User } from '../entities';

export type AddUser = (user: Partial<User>) => Promise<boolean>;
export type MakePassword = (plainPassword: string) => Promise<string>;
