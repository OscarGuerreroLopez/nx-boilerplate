import { BuildPassword, logger } from '@boilerplate/common';
import { DbMethods } from '../repo/dbMethods';
import { UserModel } from '../repo/mongo-models';

export const AddAdminUser = async (): Promise<void> => {
  try {
    const buildPassword = BuildPassword(10);
    const makePassword = buildPassword.makePassword;
    const hashPassword = await makePassword('AAbbc123@');

    const user = {
      fname: 'Oscar',
      lname: 'Admin',
      email: 'admin@oscar.com',
      password: hashPassword,
      role: 'Admin',
      userId: '8130k9',
      status: 'active',
      failedAttempts: 0,
    };

    await DbMethods('users').insert<UserModel>(user);
    logger.info('Added admin initial load', {
      service: 'boilerplate',
      file: 'seed/index.ts',
      function: 'AddAdminUser',
      code: '',
    });
  } catch (error) {
    // if they are already added don't do anything
    console.error('Not able to add admin user');
  }
};

export const AddUsers = async (): Promise<void> => {
  try {
    const buildPassword = BuildPassword(10);
    const makePassword = buildPassword.makePassword;
    const hashPassword = await makePassword('AAbbc123@');
    let user = {
      fname: 'User1',
      lname: 'bla',
      email: 'user1@oscar.com',
      password: hashPassword,
      role: 'User',
      userId: 'AGHxYB',
      status: 'active',
      failedAttempts: 0,
    };

    await DbMethods('users').insert<UserModel>(user);
    logger.info('Added user1 initial load', {
      service: 'boilerplate',
      file: 'seed/index.ts',
      function: 'AddUsers',
      code: '',
    });

    user = {
      fname: 'User2',
      lname: 'bla',
      email: 'user2@oscar.com',
      password: hashPassword,
      role: 'User',
      userId: 'gbH_us',
      status: 'active',
      failedAttempts: 0,
    };

    await DbMethods('users').insert<UserModel>(user);
    logger.info('Added user2 initial load', {
      service: 'boilerplate',
      file: 'seed/index.ts',
      function: 'AddUsers',
      code: '',
    });
  } catch (error) {
    // if they are already added don't do anything
    console.error('Not able to add admin user');
  }
};
