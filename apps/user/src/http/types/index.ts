import { Request } from 'express';

export type RequestUser = {
  fname: string;
  lname: string;
  email: string;
  role: string;
  userId: string;
  password?: string;
  failedAttempts?: number;
};

export interface CustomRequest extends Request {
  code: string;
  user: RequestUser;
  clientIp: string;
}
