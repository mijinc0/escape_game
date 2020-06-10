import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { FieldMenu } from './FieldMenu';
import { ItemMenuButton } from './ItemMenuButton';
import { Keys } from '../../core/input/Keys';
import { Item } from '../../core/models/Item';

export class FieldMenuFactory {
  static create(scene: Phaser.Scene, ownItems: Item[], keys?: Keys): FieldMenu {
    const fieldMenu = new FieldMenu(scene, keys);

    const buttonWidth = 160;
    const buttonHeight = 40;

    const itemButton = this._createItemButton(scene, ownItems, buttonWidth, buttonHeight);
    const saveButton = this._createSaveButton(scene);
    const backButton = this._createBackButton(scene);

    fieldMenu.addMenu(itemButton, saveButton, backButton);

    return fieldMenu;
  }

  private static _createItemButton(scene: Phaser.Scene, items: Item[], buttonWidth: number, buttonHeight: number): Ui.Button {
    const button = new Ui.Button(scene, {text: 'item'}, 104, 40);
  
    return button;

    /*
    return new ItemMenuButton(
      scene,
      items,
      {
        text: 'item',
      },
      buttonWidth,
      buttonHeight,
    );
    */
  }

  private static _createSaveButton(scene: Phaser.Scene): Ui.Button {
    const button = new Ui.Button(scene, {text: 'save'}, 104, 40);
  
    return button;
  }

  private static _createBackButton(scene: Phaser.Scene): Ui.Button {
    const button = new Ui.Button(scene, {text: 'back'}, 104, 40);
  
    return button;
  } 
}