import {
  Collection,
  Document,
  Filter,
  OptionalUnlessRequiredId,
} from 'mongodb';
import { UserRepo, UserModel } from './mongo-models';

export enum RepoNames {
  USERREPO = 'users',
}

export interface InstanceModel {
  find: <T>(where: Partial<T>) => Promise<T[]>;
  findOne: <T>(where: Partial<T>) => Promise<T>;
  deleteOne: <T>(where: Partial<T>) => Promise<boolean>;
  updateOne: <T>(where: Partial<T>, values: Partial<T>) => Promise<T>;
  insert: <T>(record: T) => Promise<boolean>;
}

const dbInstancesModels: Map<string, Readonly<InstanceModel>> = new Map();

export type DbMethodsType = (collection: string) => Readonly<InstanceModel>;

export const LoadMethods = async (): Promise<void> => {
  if (Array.from(dbInstancesModels.keys()).length === 0) {
    dbInstancesModels.set(
      RepoNames.USERREPO,
      loadModel<UserModel>(await UserRepo.userInstance())
    );
  }
};

export const DbMethods = (collection: string): Readonly<InstanceModel> => {
  const instanceModel = dbInstancesModels.get(collection);
  if (!instanceModel) {
    throw Error(`table ${collection} not found in db`);
  }
  return instanceModel;
};

const loadModel = <T extends Document>(
  collection: Collection<T>
): Readonly<InstanceModel> => {
  const methods = {
    find: async (where: Filter<T>) => {
      const result = await collection.find(where).toArray();

      return Object.assign([], result); // just to make sure noone alters the original value
    },
    findOne: async (where: Filter<T>) => {
      const result = await collection.findOne(where);

      return Object.assign({}, result); // just to make sure noone alters the original value
    },
    insert: async (record: OptionalUnlessRequiredId<T>): Promise<boolean> => {
      await collection.insertOne(record);

      return true;
    },
    deleteOne: async (where: Filter<T>) => {
      const existingRecord = await collection.findOne(where);

      if (!existingRecord) {
        return false;
      }

      await collection.deleteOne(existingRecord);

      return true;
    },
    updateOne: async (where: Filter<T>, values: Partial<T>) => {
      const item = await collection.findOne(where);

      const newItem = { ...item, ...values };

      const result = await collection.updateOne(
        where,
        { $set: newItem },
        {
          upsert: true,
        }
      );

      return result;
    },
  } as InstanceModel;

  return methods;
};
