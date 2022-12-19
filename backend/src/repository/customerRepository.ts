import { date } from "joi";
import app from "../app";
import { appDataSource, Customer } from "../db";

export interface ICustomerRepostiory {
  findAllCustomers(): Promise<Customer[]>;
  saveCustomer(cusotmer: Customer): Promise<Customer>;
  deleteCustomerByID(customerID: number): Promise<boolean>;
};

export class CustomerRepository implements ICustomerRepostiory {
  findAllCustomers(): Promise<Customer[]> {
    return appDataSource.getRepository(Customer).find();
  };

  async findCustomerByID(customerID: number): Promise<Customer | null> {
    return await appDataSource
      .getRepository(Customer)
      .findOne({ where: { customerID } });
  }

  saveCustomer(customer: Customer): Promise<Customer> {
    const customerToSave = new Customer();
    customerToSave.name = customer.name;
    customerToSave.creationDate = new Date();

    return appDataSource.getRepository(Customer).save(customerToSave);
  };

  async deleteCustomerByID(customerID: number): Promise<boolean> {
    if ((await this.findCustomerByID(customerID) === null)) return false;

    await appDataSource.createQueryBuilder().delete().from(Customer).where(`customerID = :id`, { id: customerID }).execute();

    if ((await this.findCustomerByID(customerID)) === null) {
      return true;
    } else {
      return false;
    };
  };
};