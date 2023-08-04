import { Collection } from 'mongodb';
import { Database } from '../../mongo-db';

import { Logger } from '@boilerplate/common';
import { UserModel } from './interfaces';

export const UserRepo = (() => {
  let instance: Collection<UserModel>;

  const makeUserIntance = async () => {
    const db = await Database.getConnection();
    instance = db.collection<UserModel>('users');
    await instance.createIndex(
      { email: 1 },
      { unique: true, background: true }
    );
  };

  return {
    userInstance: async () => {
      if (!instance) {
        await makeUserIntance();
      }

      Logger.info('returning users instance model');

      return instance;
    },
  };
})();
