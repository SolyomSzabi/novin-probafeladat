import { Customer } from "../../db";
import { ICustomerRepostiory } from "../../repository";

type ReturnType = {
  status: string;
  message: string[];
};

type ReturnWithCustomer = ReturnType & {
  customer: Customer;
};

export interface ICustomerService {
  getCustomers(): Promise<Customer[]>;
  createCustomer(cusotmer: Customer): Promise<ReturnType | ReturnWithCustomer>;
  deleteCustomerByID(customerID: number): Promise<ReturnType>;
}

export class CustomerService implements ICustomerService {
  constructor(private customerRepository: ICustomerRepostiory) { }

  async getCustomers(): Promise<Customer[]> {
    return await this.customerRepository.findAllCustomers();
  }

  async createCustomer(cusotmer: Customer): Promise<ReturnType | ReturnWithCustomer> {
    const newCustomer = await this.customerRepository.saveCustomer(cusotmer);

    return {
      status: 'OK',
      message: [`Customer was succesfully created with customerID: ${newCustomer.customerID}`],
      customer: newCustomer
    };
  };

  async deleteCustomerByID(customerID: number): Promise<ReturnType> {
    const deletedCustomer: boolean = (await this.customerRepository.deleteCustomerByID(customerID)) === !null;
    return {
      status: deletedCustomer ? 'OK' : 'Error',
      message: deletedCustomer
        ? [`Customer succesfully deleted with id:${customerID}`]
        : [`customer with ${customerID} not found`],
    };
  };
};