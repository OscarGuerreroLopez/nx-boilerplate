import { AuthCommon } from './authCommon';
import { BuildMakeVerifyJwt } from './jwt';

describe('authCommon test', () => {
  const buildJwt = BuildMakeVerifyJwt();
  const makeToken = buildJwt.makeToken;
  const verifyToken = buildJwt.verifyToken;
  const authCommon = AuthCommon(verifyToken);

  it('should verify the token', () => {
    const token = makeToken({
      id: '234Fa23',
      role: 'Admin',
      userAgent: 'my user agent',
      clientIp: '0:0:0:1',
    });

    const result = authCommon(token, 'my user agent', '0:0:0:1');

    expect(result).toStrictEqual({
      id: '234Fa23',
      role: 'Admin',
      userAgent: 'my user agent',
      clientIp: '0:0:0:1',
    });
  });

  it('should fail cause different user agent', () => {
    try {
      const token = makeToken({
        id: '234Fa23',
        role: 'Admin',
        userAgent: 'my user agent',
        clientIp: '0:0:0:1',
      });

      authCommon(token, 'my user agent chnaged', '0:0:0:1');
    } catch (error: any) {
      expect(error.message).toStrictEqual('User 234Fa23 has changed location');
    }
  });

  it('should fail cause different ip', () => {
    try {
      const token = makeToken({
        id: '234Fa23',
        role: 'Admin',
        userAgent: 'my user agent',
        clientIp: '0:0:0:1',
      });

      authCommon(token, 'my user agent', '0:0:0:2');
    } catch (error: any) {
      expect(error.message).toStrictEqual('User 234Fa23 has changed location');
    }
  });
});
