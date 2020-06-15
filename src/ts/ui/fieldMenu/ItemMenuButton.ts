import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { ItemListElement } from './ItemListElement';
import { Item } from '../../core/models/Item';

export class ItemMenuButton extends Ui.Button {
  private items: Item[];

  constructor(
    scene: Phaser.Scene,
    items: Item[],
    config: Ui.IButtonConfig,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ) {
    super(scene, config, x, y, width, height);

    this.items = items;
  }

  select(): void {
    const itemDescribe = this._createItemDescribe();
    const itemList = this._createItemList();
    
    this.pushNode(itemDescribe, itemList);
    
    super.select();
  }

  private _createItemList(): Ui.ArrayMapContainer<Item> {
    const displayArea = this.scene.cameras.main.worldView;

    const x = displayArea.left + 100;
    const y = displayArea.top + 150;

    const itemList = Ui.ArrayMapContainerFactory.createDownRange(
      this.items,
      this._createItemListElement.bind(this),
      10,
      1,
      x,
      y,
    );
    
    itemList.addCancelEvent((thisContainer: Ui.IContainer) => {      
      thisContainer.destroy();
    });

    return itemList;
  }

  private _createItemListElement(item: Item): ItemListElement {
    const itemListElement = new ItemListElement(
      this.scene,
      item,
      {
        backgroundColor: 0x000000,
        backgroundAlpha: 0.8,
        fontFamily: 'monospace',
        fontSize: 16,
        fontColor: 'white',
      },
      0,
      0,
      200,
      48,
    );

    return itemListElement;
  }

  private _createItemDescribe(): Ui.TextBox {
    const displayArea = this.scene.cameras.main.worldView;

    const x = displayArea.left + 100;
    const y = displayArea.top + 350;
    const width = 200;
    const height = 160;

    return new Ui.TextBox(this.scene, {text: 'kokoni text'}, x, y, width, height);
  }
}