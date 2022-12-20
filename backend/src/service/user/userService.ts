import { User } from "../../db";
import { IUserRepository } from "../../repository";

export interface IUserService {
  getUsers(): Promise<User[]>;
  getUserByUserName(userName: string): Promise<User[]>
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) { }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAllUsers();
  }

  async getUserByUserName(userName: string): Promise<User[]> {
    return await this.userRepository.findUserByUserName(userName);
  }
}