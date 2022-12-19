import { Router } from "express"
import { IUserService } from "../service";

export class UserController {
  private readonly _router: Router = Router();

  constructor(
    private userService: IUserService
  ) {
    this._router.get('/users', async (req, res) => {
      res.json(await this.userService.getUsers());
    });
  };

  get router(): Router {
    return this._router;
  }
};