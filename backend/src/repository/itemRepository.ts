import { appDataSource, Item } from "../db";

export interface IItemRepository {
  findAllItems(): Promise<Item[]>;
}

export class ItemRepository implements IItemRepository {
  findAllItems(): Promise<Item[]> {
    return appDataSource.getRepository(Item).find();
  }
}