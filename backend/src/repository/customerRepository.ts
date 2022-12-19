import app from "../app";
import { appDataSource, Customer } from "../db";

export interface ICustomerRepostiory {
  findAllCustomers(): Promise<Customer[]>;
}

export class CustomerRepository implements ICustomerRepostiory {
  findAllCustomers(): Promise<Customer[]> {
    return appDataSource.getRepository(Customer).find();
  }
}