import { ObjectId } from 'mongodb';

export interface Model {
  _id?: ObjectId;
}

export interface UserModel extends Model {
  name: string;
  email: string;
  password: string;
  role: string;
  userId: string;
}
