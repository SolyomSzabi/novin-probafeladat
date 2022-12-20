import { Router } from "express";
import { Customer } from "../db";
import { ICustomerService } from "../service";

export class CustomerController {
  private readonly _router: Router = Router();

  constructor(
    private customerService: ICustomerService
  ) {
    this._router.get('/customers', async (req, res) => {
      res.json(await this.customerService.getCustomers());
    });

    this._router.post('/customers',
      async (req, res) => {
        const customer: Customer = req.body as Customer;
        res.json(await this.customerService.createCustomer(customer));
      });

    this._router.delete('/customers/:customerID',
      async (req, res) => {
        const customerID:number = Number(req.params.customerID);
        const message = await this.customerService.deleteCustomerByID(customerID);
        res.status(message.status === 'OK' ? 200 : 400).json(message.message);
      });
  };

  get router(): Router {
    return this._router;
  };
};