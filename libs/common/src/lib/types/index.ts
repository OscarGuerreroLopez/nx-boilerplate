export type IObjectLiteral = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export interface TokenPayload {
  id: string;
  role: string;
  userAgent: string;
  clientIp: string;
}

export type MakeTokenType = (data: TokenPayload) => string;
export type VerifyTokenType = (token: string) => TokenPayload;
export interface MakeJwt {
  makeToken: MakeTokenType;
  verifyToken: VerifyTokenType;
}

export type AuthCommonType = (
  token: string,
  userAgent: string,
  clientIp: string
) => TokenPayload;

export enum Severity {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface BoilerplateLogger {
  service: string;
  file: string;
  method?: string;
  code: string;
  [key: string]: any;
}

export type SeverityType = 'info' | 'warn' | 'error';

export enum HttpCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum CommomErrors {
  BAD_PASSWORD = 'Bad password',
  MAKE_USER_PARAMS = 'Missing user params',
  MAKE_USER_EMAIL = 'Bad Email',
  MAKE_USER_PASSWORD = 'Invalid password',
  USER_NOT_FOUND = 'User not found',
  USER_LOCKED = 'User account Blocked',
  USER_LOCATION = 'User chnaged location',
  USER_UNAUTHORIZED = 'User Unauthorized',
}
