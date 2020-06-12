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
    const itemList = Ui.ArrayMapContainerFactory.createDownRange(
      this.items,
      this._createItemListElement.bind(this),
      10,
    );
    
    itemList.addCancelEvent((thisContainer: Ui.IContainer) => {      
      thisContainer.destroy();
    });
    
    this.pushNode(itemList);

    super.select();
  }

  private _createItemListElement(item: Item): ItemListElement {
    return new ItemListElement(
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
  }
}