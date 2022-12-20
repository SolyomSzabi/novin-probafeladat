import { Router } from "express";
import { Item } from "../db";
import { IItemService } from "../service";

export class ItemController {
  private readonly _router: Router = Router();

  constructor(
    private itemService: IItemService
  ) {
    this._router.get('/items', async (req, res) => {
      res.json(await this.itemService.getItems());
    });

    this._router.post('/items', async (req, res) => {
      const item: Item = req.body as Item;
      res.json(await this.itemService.createItem(item));
    });

    this._router.delete('/items/:itemID', async (req, res) => {
      const itemID = Number(req.params.itemID);
      const message = await this.itemService.deleteItemByID(itemID);
      res.status(message.status === 'OK' ? 200 : 404).json(message.message);

    });
  };

  get router(): Router {
    return this._router;
  };
};