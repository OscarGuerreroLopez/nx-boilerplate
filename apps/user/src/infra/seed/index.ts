import { BuildPassword, logger } from '@boilerplate/common';
import { DbMethods } from '../repo/dbMethods';
import { UserModel } from '../repo/mongo-models';

export const AddAdminUser = async (): Promise<void> => {
  try {
    const buildPassword = BuildPassword(10);
    const makePassword = buildPassword.makePassword;
    const hashPassword = await makePassword('Abc123');

    const user = {
      name: 'Admin',
      email: 'admin@oscar.com',
      password: hashPassword,
      role: 'Admin',
      userId: '8130k9',
    };

    const userFound = await DbMethods('users').findOne({ userId: user.userId });

    if (Object.keys(userFound).length === 0) {
      await DbMethods('users').insert<UserModel>(user);
      logger.info('Added admin initial load', {
        service: 'boilerplate',
        file: 'seed/index.ts',
        function: 'AddAdminUser',
        code: '',
      });
    } else {
      logger.info('admin already in DB', {
        service: 'boilerplate',
        file: 'seed/index.ts',
        function: 'AddAdminUser',
        code: '',
      });
    }
  } catch (error) {
    throw new Error('Not able to add admin user');
  }
};

export const AddUsers = async (): Promise<void> => {
  try {
    const buildPassword = BuildPassword(10);
    const makePassword = buildPassword.makePassword;
    const hashPassword = await makePassword('Abc123');
    let user = {
      name: 'User',
      email: 'user1@oscar.com',
      password: hashPassword,
      role: 'User',
      userId: 'AGHxYB',
    };

    let userFound = await DbMethods('users').findOne({ userId: user.userId });

    if (Object.keys(userFound).length === 0) {
      await DbMethods('users').insert<UserModel>(user);
      logger.info('Added user1 initial load', {
        service: 'boilerplate',
        file: 'seed/index.ts',
        function: 'AddUsers',
        code: '',
      });
    } else {
      logger.info('user1 already in DB', {
        service: 'boilerplate',
        file: 'seed/index.ts',
        function: 'AddUsers',
        code: '',
      });
    }

    user = {
      name: 'User',
      email: 'user2@oscar.com',
      password: hashPassword,
      role: 'User',
      userId: 'gbH_us',
    };

    userFound = await DbMethods('users').findOne({ userId: user.userId });

    if (Object.keys(userFound).length === 0) {
      await DbMethods('users').insert<UserModel>(user);
      logger.info('Added user2 initial load', {
        service: 'boilerplate',
        file: 'seed/index.ts',
        function: 'AddUsers',
        code: '',
      });
    } else {
      logger.info('user2 already in DB', {
        service: 'boilerplate',
        file: 'seed/index.ts',
        function: 'AddUsers',
        code: '',
      });
    }
  } catch (error) {
    throw new Error('Not able to add admin user');
  }
};