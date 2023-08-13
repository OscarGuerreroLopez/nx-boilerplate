import { BuildMakeUser } from './buildMakeUser';
import { validateEmail, validatePassword } from '@boilerplate/common';

const makeUUIDMock = () => {
  return 'abc123fgtu';
};

describe('buildMakeUser Test', () => {
  const userEntity = BuildMakeUser({
    validateEmail,
    validatePassword,
    makeUUID: makeUUIDMock,
  });
  it('should return the right user entity', () => {
    const user = userEntity({
      fname: 'Oscar',
      lname: 'Lopez',
      email: 'oscar@oscar.com',
      password: 'Abc123',
    });

    const fname = user.getFname();
    const lname = user.getLname();
    const email = user.getEmail();
    const userId = user.getUserId();

    expect(userId).toStrictEqual('abc123fgtu');
    expect(fname).toStrictEqual('Oscar');
    expect(lname).toStrictEqual('Lopez');
    expect(email).toStrictEqual('oscar@oscar.com');
  });

  it('Should fail password check', () => {
    try {
      userEntity({
        fname: 'Oscar',
        lname: 'Lopez',
        email: 'oscar@oscar.com',
        password: 'abc',
      });
    } catch (error) {
      expect(error.message).toStrictEqual('Invalid password');
    }
  });
});
