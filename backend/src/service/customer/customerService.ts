import { Customer } from "../../db";
import { ICustomerRepostiory } from "../../repository";

export interface ICustomerService {
  getCustomers(): Promise<Customer[]>;
}

export class CustomerService implements ICustomerService{
  constructor(private customerRepository: ICustomerRepostiory){}

  async getCustomers(): Promise<Customer[]> {
    return await this.customerRepository.findAllCustomers();
  }
}