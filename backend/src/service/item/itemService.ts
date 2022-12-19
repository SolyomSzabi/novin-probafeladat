import { Item } from "../../db";
import { IItemRepository } from "../../repository";

export interface IItemService {
  getItems(): Promise<Item[]>;
}

export class ItemService implements IItemService {
  constructor(private itemRepository: IItemRepository) { }

  async getItems(): Promise<Item[]> {
    return await this.itemRepository.findAllItems();
  }
}