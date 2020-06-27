import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { ItemListElement } from './ItemListElement';
import { ItemDescription } from './ItemDescription';
import { Item } from '../../core/models/Item';

type ItemMenuConfig = {
  scene: Phaser.Scene,
  items: Item[],
};

export class ItemMenu extends Ui.Group {
  list: Ui.ScrollGroup<Item>;
  
  private scene: Phaser.Scene;
  private items: Item[];
  private description: ItemDescription;
  
  constructor(config: ItemMenuConfig, dx = 0, dy = 0, anchor?: Ui.IElement) {
    const width = 728;
    const height = 272;
    super(dx, dy, width, height, anchor);

    this.alignmentHandler = null;
    this.entries = [];
    this.currentIndex = -1;
    this.scene = config.scene;
    this.items = config.items;

    this._init();
  }

  private _init(): void {
    this.description = this._createItemDescription();
    this.list = this._createItemList();

    this.push(this.list, this.description);
  }

  private _createItemDescription(): ItemDescription {
    const itemDescriptionConfig = {
      scene: this.scene,
      defailtText: '',
    };

    const dx = 296;
    const dy = 0;
    const width = 432;
    const height = 272;

    return new ItemDescription(itemDescriptionConfig, dx, dy, width, height);
  }

  private _createItemList(): Ui.ScrollGroup<Item> {
    const itemList = this._createItemListBaseGroup();
    itemList.setData(
      this.items,
      this._createItemListElement.bind(this),
    );

    return itemList;
  }

  private _createItemListBaseGroup():  Ui.ScrollGroup<Item> {
    const width = 280;
    const height = 272;
    const maxItemViewSize = 5;
    const scrollSize = 1;
    const margin = 8;
    const ah = new Ui.RangeAlignmentHandler(margin, Ui.Direction.Down);
    //const ah: Ui.IAlignmentHandler = null;

    return new Ui.ScrollGroup<Item>(0, 0, width, height, null, ah, maxItemViewSize, scrollSize);
  }

  private _createItemListElement(item: Item): ItemListElement {
    const itemListElementConfig = {
      item: item,
      scene: this.scene,
      description: this.description,
    };

    return new ItemListElement(itemListElementConfig, 0, 0, 280, 48);
  }
}