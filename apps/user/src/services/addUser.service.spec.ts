import { DbMethods, LoadMethods } from '../infra/repo/dbMethods';
import { MakeAddUser } from './addUser.service';
import { BuildPassword } from '@boilerplate/common';
import { TestConnection } from '../infra/mongo-db/testConnection';
import { MakeFindUser } from './findUser.service';

describe('user service test', () => {
  const buildPassword = BuildPassword(10);
  const makePassword = buildPassword.makePassword;
  const removePassword = buildPassword.removePassword;
  const { findUserByEmail } = MakeFindUser(DbMethods, removePassword);

  const AddUser = MakeAddUser(DbMethods, makePassword);

  beforeAll(async () => {
    await LoadMethods();
  }, 120000);

  afterAll(async () => {
    await TestConnection.closeConnection();
  }, 120000);

  describe('add user', () => {
    it('should add a user', async () => {
      const result = await AddUser({
        fname: 'Oscar',
        lname: 'Lopez',
        email: 'oscar@oscar.com',
        password: 'AAbbc123@',
      });

      expect(result).toBeTruthy();

      const newUser = await findUserByEmail('oscar@oscar.com');

      expect(newUser.role).toBe('Guess');
      expect(newUser.status).toBe('active');
    });

    it('should throw an error if password not correct', async () => {
      try {
        await AddUser({
          fname: 'Oscar',
          lname: 'Lopez',
          email: 'oscar@oscar.com',
          password: 'abc',
        });
      } catch (error) {
        expect(error.message).toStrictEqual('Invalid password entered');
      }
    });

    it('should throw an error if missing paramst', async () => {
      try {
        await AddUser({
          fname: 'Oscar',
          lname: 'Lopez',
        });
      } catch (error) {
        expect(error.message).toStrictEqual('Some user params were missing');
      }
    });
  });
});
