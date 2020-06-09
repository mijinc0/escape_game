import * as Phaser from 'phaser';
import { FieldMenu } from './FieldMenu';
import { Keys } from '../../core/input/Keys';
import { Button } from '../../core/ui/objects/Button';
import { NodeStatus } from '../../core/ui/NodeStatus';
import { ArrayMapContainerFactory } from '../../core/ui/containers/ArrayMapContainerFactory';
import { Item } from '../../core/models/Item';

export class FieldMenuFactory {
  static create(scene: Phaser.Scene, ownItems: Item[], keys?: Keys): FieldMenu {
    const fieldMenu = new FieldMenu(scene, keys);

    const itemButton = this._createItemButton(scene, ownItems);
    const saveButton = this._createSaveButton(scene);
    const backButton = this._createBackButton(scene);

    fieldMenu.addMenu(itemButton, saveButton, backButton);

    return fieldMenu;
  }

  private static _createItemButton(scene: Phaser.Scene, items: Item[]): Button {
    const button = new Button(scene, {text: 'item'}, 104, 64);

    //const itemContainer = ArrayMapContainerFactory.createDownRange(items, 320, 240, 10, 100, 100, 10);

    return button;
  }

  private static _createSaveButton(scene: Phaser.Scene): Button {
    const button = new Button(scene, {text: 'item'}, 104, 64);
  
    return button;
  }

  private static _createBackButton(scene: Phaser.Scene): Button {
    const button = new Button(scene, {text: 'item'}, 104, 64);
  
    return button;
  } 
}