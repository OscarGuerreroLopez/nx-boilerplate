import * as uuidModule from 'uuid';
jest.mock('uuid');
const mockMakeUUID = jest.spyOn(uuidModule, 'v4');

import { DbMethods, LoadMethods } from '../infra/repo/dbMethods';
import { MakeFindUser } from './findUser.service';
import { MakeAddUser } from './addUser.service';

import { BuildPassword } from '@boilerplate/common';
import { TestConnection } from '../infra/mongo-db/testConnection';

describe('find users test', () => {
  const buildPassword = BuildPassword(10);
  const removePassword = buildPassword.removePassword;
  const findUser = MakeFindUser(DbMethods, removePassword);
  const makePassword = buildPassword.makePassword;
  const AddUser = MakeAddUser(DbMethods, makePassword);

  beforeAll(async () => {
    await LoadMethods();

    mockMakeUUID.mockReturnValue('111');
    await AddUser({
      fname: 'Oscar',
      lname: 'Lopez',
      email: 'oscar@oscar.com',
      password: 'AAbbc123@',
    });

    mockMakeUUID.mockReturnValue('222');
    await AddUser({
      fname: 'Oscar',
      lname: 'Lopez',
      email: 'oscar2@oscar.com',
      password: 'AAbbc123@',
    });

    mockMakeUUID.mockReturnValue('333');
    await AddUser({
      fname: 'Oscar',
      lname: 'Lopez',
      email: 'oscar3@oscar.com',
      password: 'AAbbc123@',
    });
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  describe('find one user by email', () => {
    it('should find the right user', async () => {
      const result = await findUser.findUserByEmail('oscar@oscar.com');

      expect(result.email).toStrictEqual('oscar@oscar.com');
      expect(result.userId).toStrictEqual('111');
    });

    it('should not find the right user', async () => {
      const result = await findUser.findUserByEmail('oscar9@oscar.com');

      expect(result.email).toBeUndefined();
    });
  });

  describe('find one user by id', () => {
    it('should find the right user', async () => {
      const result = await findUser.findUserByUserId('111');

      expect(result.email).toStrictEqual('oscar@oscar.com');
    });

    it('should not find the right user', async () => {
      const result = await findUser.findUserByEmail('999');

      expect(result.email).toBeUndefined();
    });
  });

  describe('find should find all users', () => {
    it('should find the right users', async () => {
      const result = await findUser.findAllUsers();

      expect(result.length).toEqual(3);
      expect(result[0].email).toStrictEqual('oscar@oscar.com');
    });
  });
});
