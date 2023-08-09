import { Request } from 'express';
export type IObjectLiteral = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type RequestUser = {
  name: string;
  email: string;
  role: string;
  userId: string;
};

export interface CustomRequest extends Request {
  code: string;
  user: RequestUser;
}
