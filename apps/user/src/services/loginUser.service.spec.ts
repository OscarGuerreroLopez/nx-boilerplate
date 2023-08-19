import * as uuidModule from 'uuid';
jest.mock('uuid');
const mockMakeUUID = jest.spyOn(uuidModule, 'v4');

import { MakeLoginUser } from './loginUser.service';
import { DbMethods, LoadMethods } from '../infra/repo/dbMethods';
import { BuildPassword } from '@boilerplate/common';
import { TestConnection } from '../infra/mongo-db/testConnection';
import { MakeAddUser } from './addUser.service';

describe('Login user test', () => {
  const buildPassword = BuildPassword(10);
  const comparePassword = buildPassword.comparePassword;
  const makePassword = buildPassword.makePassword;
  const AddUser = MakeAddUser(DbMethods, makePassword);

  const makeTokenMock = jest.fn(() => '123Ath_98');

  const loginUser = MakeLoginUser({
    repo: DbMethods,
    comparePassword,
    makeToken: makeTokenMock,
  });

  beforeAll(async () => {
    await LoadMethods();

    mockMakeUUID.mockReturnValue('111');
    await AddUser({
      fname: 'Oscar',
      lname: 'Lopez',
      email: 'oscar@oscar.com',
      password: 'Abc123',
    });
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  it('should return the right token', async () => {
    const result = await loginUser({
      email: 'oscar@oscar.com',
      password: 'Abc123',
      clientIp: '0.0.0.1',
      userAgent: 'fakeUserAgent',
    });

    expect(result).toStrictEqual('123Ath_98');
    expect(makeTokenMock).toHaveBeenCalledWith({
      clientIp: '0.0.0.1',
      id: '111',
      role: 'Guess',
      userAgent: 'fakeUserAgent',
    });
  });

  it('should throw a user not found error', async () => {
    try {
      await loginUser({
        email: 'pepe@oscar.com',
        password: 'Abc123',
        clientIp: '0.0.0.1',
        userAgent: 'fakeUserAgent',
      });
    } catch (error) {
      expect(error.message).toStrictEqual(
        'User with email pepe@oscar.com does not exists'
      );
    }
  });

  it('should throw a password validation error', async () => {
    try {
      await loginUser({
        email: 'oscar@oscar.com',
        password: 'Abc123X',
        clientIp: '0.0.0.1',
        userAgent: 'fakeUserAgent',
      });
    } catch (error) {
      expect(error.message).toStrictEqual(
        'User with email oscar@oscar.com wrong password'
      );
    }
  });
});
