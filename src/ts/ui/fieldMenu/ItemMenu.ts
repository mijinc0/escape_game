import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { ItemListElement } from './ItemListElement';
import { ItemDescription } from './ItemDescription';
import { Item } from '../../core/models/Item';
import { UiRenderOrder } from '../../core/renders/UiRenderOrder';

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
    const width = 600;
    const height = 272;
    super(dx, dy, width, height, anchor);

    this.alignmentHandler = null;
    this.entries = [];
    this.currentIndex = -1;
    this.scene = config.scene;
    this.items = config.items;

    // 先にDescriptionを生成する
    //const itemDescriptionContainer = this._createItemDescriptionContainer();
    this.description = this._createItemDescription();

    const itemListContainer = this._createItemListContainer();
    this.list = this._createItemList();
    itemListContainer.push(this.list);

    this.push(itemListContainer, this.description);
  }

  private _createItemListContainer(): Ui.Group {
    const width = 240;
    const height = 312;

    const group = new Ui.Group(0, 0, width, height);

    const rectangle = new Ui.Rectangle(this.scene, 0, 0, width, height, 0x000000, 0.5);
    rectangle.setOrigin(0);
    UiRenderOrder.base(rectangle); 

    const title = new Ui.Text(this.scene, 16, 8, 'items', {});
    title.setOrigin(0);
    UiRenderOrder.base(title); 

    this.scene.add.existing(rectangle);
    this.scene.add.existing(title);

    group.push(rectangle, title);

    return group;
  }

  private _createItemDescription(): ItemDescription {
    const itemDescriptionConfig = {
      scene: this.scene,
      defailtText: '',
    };

    const dx = 256;
    const dy = 0;
    const width = 258;
    const height = 312;

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
    const dx = 4;
    const dy = 36;
    const width = 240;
    const height = 272;
    const maxItemViewSize = 5;
    const scrollSize = 1;
    const margin = 12;
    const ah = new Ui.RangeAlignmentHandler(margin, Ui.Direction.Down);

    return new Ui.ScrollGroup<Item>(dx, dy, width, height, null, ah, maxItemViewSize, scrollSize);
  }

  private _createItemListElement(item: Item): ItemListElement {
    const itemListElementConfig = {
      item: item,
      scene: this.scene,
      description: this.description,
    };

    return new ItemListElement(itemListElementConfig, 0, 0, 224, 44);
  }
}