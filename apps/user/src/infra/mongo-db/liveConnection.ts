import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { Logger, EnvVars } from '@boilerplate/common';

export const LiveConnection = (() => {
  let mongoClient: MongoClient;
  let db: Db;

  const createConnection = async () => {
    try {
      const uri = `mongodb://${EnvVars.MONGO_USER}:${EnvVars.MONGO_PASSWORD}@${EnvVars.MONGO_URL}/?retryWrites=true&w=majority`;

      const options: MongoClientOptions = {
        maxPoolSize: 10,
        minPoolSize: 5,
      };

      mongoClient = new MongoClient(uri, options);
      await mongoClient.connect();
      db = mongoClient.db('accounts');
      Logger.info('accounts Live DB activated');
    } catch (error) {
      Logger.error(`Error connecting to the DB server: ${error}`); // special case for some reason

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
        Logger.info('accounts DB closed');
      }
    },
  };
})();
