import { Db, MongoClient, MongoServerError } from 'mongodb';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { logger } from '@boilerplate/common';

export const TestConnection = (() => {
  let mongoClient: MongoClient;
  let db: Db;

  const createConnection = async () => {
    try {
      const replSet = await MongoMemoryReplSet.create({
        replSet: { storageEngine: 'wiredTiger' },
        binary: { version: '4.2.2' },
      });

      const replicaUri = replSet.getUri();
      logger.info(`DB will be located at ${replicaUri}`, {
        service: 'boilerplate',
        file: 'testConnection.ts',
        function: 'createConnection',
        code: '',
      });

      mongoClient = new MongoClient(replicaUri, {
        maxPoolSize: 10,
        minPoolSize: 5,
      });
      await mongoClient.connect();
      db = mongoClient.db('memoryDB');
      logger.info('memoryDB activated', {
        service: 'boilerplate',
        file: 'testConnection.ts',
        function: 'createConnection',
        code: '',
      });
    } catch (error) {
      if (error instanceof MongoServerError) {
        logger.error(`Error connecting to the DB server: ${error}`, {
          service: 'boilerplate',
          file: 'testConnection.ts',
          function: 'createConnection',
          code: '',
        }); // special case for some reason
      }
      throw error;
    }
  };

  return {
    getConnection: async () => {
      if (!db) {
        await createConnection();
      }
      return db;
    },
    closeConnection: async () => {
      if (mongoClient) {
        await mongoClient.close();
      }
    },
    checkConnection: async () => {
      if (!db) {
        await createConnection();
      }

      return true;
    },
  };
})();
