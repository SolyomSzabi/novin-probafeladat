import { Router } from "express";
import { IItemService } from "../service";

export class ItemController {
  private readonly _router: Router = Router();

  constructor(
    private itemService: IItemService
  ) {
    this._router.get('/items', async (req, res) => {
      res.json(await this.itemService.getItems());
    });
  };

  get router(): Router {
    return this._router;
  }
}