import { Router } from "express";
import { ICustomerService } from "../service";

export class CustomerController {
  private readonly _router: Router = Router();

  constructor(
    private customerService: ICustomerService
  ) {
    this._router.get('/customers', async (req, res) => {
      res.json(await this.customerService.getCustomers());
    });
  };

  get router(): Router {
    return this._router;
  };
};