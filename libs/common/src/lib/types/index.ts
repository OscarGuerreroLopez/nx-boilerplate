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
