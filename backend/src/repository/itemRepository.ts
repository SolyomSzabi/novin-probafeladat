import { appDataSource, Item } from "../db";

export interface IItemRepository {
  findAllItems(): Promise<Item[]>;
  saveItem(item: Item): Promise<Item>;
  deleteItemByID(itemID: number): Promise<boolean>;
}

export class ItemRepository implements IItemRepository {
  findAllItems(): Promise<Item[]> {
    return appDataSource.getRepository(Item).find();
  }

  findItemByID(itemID: number): Promise<Item | null> {
    return appDataSource.getRepository(Item).findOne({ where: { itemID: itemID } });
  };

  saveItem(item: Item): Promise<Item> {
    const itemToSave = new Item();
    itemToSave.itemName = item.itemName;
    itemToSave.customer = item.customer;
    itemToSave.comment = item.comment;
    itemToSave.creationDate = new Date();
    itemToSave.price = item.price;
    itemToSave.status = 'avaiable';

    return appDataSource.getRepository(Item).save(itemToSave);
  }

  async deleteItemByID(itemID: number): Promise<boolean> {
    if ((await this.findItemByID(itemID)) === null) return false;

    await appDataSource.createQueryBuilder().delete()
      .from(Item).where('itemID=:id', { id: itemID }).execute();

    if ((await this.findItemByID(itemID)) === null) {
      return true;
    } else {
      return false;
    };
  };
};