import { IItemBag } from '../../core/models/IItemBag';

export class ItemContainer {
  private itemBag: IItemBag;
  
  constructor(itemBag: IItemBag) {
    this.itemBag = itemBag;
  }
}