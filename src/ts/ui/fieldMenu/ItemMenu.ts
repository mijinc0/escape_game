import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { Button } from '../Button';
import { Item } from '../../core/models/Item';

type ItemMenuConfig = {
  scene: Phaser.Scene,
  items: Item[],
};

/*
export class ItemMenu extends Ui.AbsComponentGroup<ItemMenuConfig> {
  list: ItemList;

  init(config: ItemMenuConfig): void {
    const itemDescription = new ItemDescription();
    const itemList = this._createItemList();

    this.list = itemList;
    this.push(itemList, itemDescription);
  }

  private _createItemList(): Ui.ScrollGroup<Item> {
    
  }

  private _createItemListElement(): 
}
*/