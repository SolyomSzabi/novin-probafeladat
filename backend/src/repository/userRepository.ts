import { appDataSource, User } from "../db";

export interface IUserRepository {
  findAllUsers(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  findAllUsers(): Promise<User[]> {
    return appDataSource.getRepository(User).find();
  }
}