import { Item } from "../../db";
import { IItemRepository } from "../../repository";

type ReturnType = {
  status: string;
  message: string[];
};

type ReturnWithItem = ReturnType & {
  item: Item;
};

export interface IItemService {
  getItems(): Promise<Item[]>;
  createItem(item: Item): Promise<ReturnType | ReturnWithItem>;
  deleteItemByID(itemID: number): Promise<ReturnType>;
}

export class ItemService implements IItemService {
  constructor(private itemRepository: IItemRepository) { }

  async getItems(): Promise<Item[]> {
    return await this.itemRepository.findAllItems();
  }

  async createItem(item: Item): Promise<ReturnType | ReturnWithItem> {
    const newItem = await this.itemRepository.saveItem(item);
    return {
      status: 'OK',
      message: [`Item is succesfully saved with id: ${newItem.itemID}`],
      item: newItem,
    };
  };

  async deleteItemByID(itemID: number): Promise<ReturnType> {
    const deletedItem: boolean = (await this.itemRepository.deleteItemByID(itemID)) === !null;
    return {
      status: deletedItem ? 'OK' : 'Error',
      message: deletedItem
        ? [`Item succesfully deleted with id: ${itemID}`]
        : [`Item with ${itemID} not found`],
    };
  };
};