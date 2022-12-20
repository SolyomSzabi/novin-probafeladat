import { appDataSource, User } from "../db";

export interface IUserRepository {
  findAllUsers(): Promise<User[]>;
  findUserByUserName(userName: string): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  findAllUsers(): Promise<User[]> {
    return appDataSource.getRepository(User).find();
  }

  findUserByUserName(userName: string): Promise<User[]> {
    return appDataSource.getRepository(User).find({ where: { userName: userName } })
  }
}