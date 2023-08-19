import { AppError } from './exceptions';
import { AuthCommonType, VerifyTokenType, TokenPayload } from './types';
import { CommomErrors } from './types';
export const AuthCommon = (verifyToken: VerifyTokenType): AuthCommonType => {
  return (token: string, userAgent: string, clientIp: string): TokenPayload => {
    const decoded = verifyToken(token);

    if (decoded.userAgent !== userAgent || decoded.clientIp !== clientIp) {
      throw new AppError(
        CommomErrors.USER_LOCATION,
        `User ${decoded.id} has changed location`
      );
    }

    return {
      id: decoded.id,
      role: decoded.role,
      userAgent: decoded.userAgent,
      clientIp: decoded.clientIp,
    };
  };
};
