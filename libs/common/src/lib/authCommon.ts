import { AuthCommonType, VerifyTokenType, TokenPayload } from './types';

export const AuthCommon = (verifyToken: VerifyTokenType): AuthCommonType => {
  return (
    token?: string,
    userAgent?: string,
    clientIp?: string
  ): TokenPayload => {
    if (!token) {
      throw new Error('missing token');
    }
    if (!userAgent) {
      throw new Error('missing user agent');
    }

    if (!clientIp) {
      throw new Error('missing client ip');
    }

    const decoded = verifyToken(token);

    if (decoded.userAgent !== userAgent || decoded.clientIp !== clientIp) {
      throw new Error(`User ${decoded.id} has changed location`);
    }

    return {
      id: decoded.id,
      role: decoded.role,
      userAgent: decoded.userAgent,
      clientIp: decoded.clientIp,
    };
  };
};
