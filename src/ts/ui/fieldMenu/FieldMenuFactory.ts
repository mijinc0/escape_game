import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { FieldMenu } from './FieldMenu';
import { ItemMenuButton } from './ItemMenuButton';
import { Keys } from '../../core/input/Keys';
import { Item } from '../../core/models/Item';

export class FieldMenuFactory {
  static create(scene: Phaser.Scene, ownItems: Item[], keys?: Keys): FieldMenu {
    const displayArea = scene.cameras.main.worldView;

    const x = displayArea.left + 100;
    const y = displayArea.top + 100;
    const fieldMenu = new FieldMenu(scene, x, y, keys);

    const buttonWidth = 160;
    const buttonHeight = 40;

    const itemButton = this._createItemButton(scene, ownItems, buttonWidth, buttonHeight);
    const saveButton = this._createSaveButton(scene);
    const backButton = this._createBackButton(scene);

    fieldMenu.addMenu(itemButton, saveButton, backButton);

    return fieldMenu;
  }

  private static _createItemButton(scene: Phaser.Scene, items: Item[], buttonWidth: number, buttonHeight: number): Ui.Button {
    const button = new Ui.Button(scene, {text: 'item'}, 0, 0, 104, 40);
  
    return button;
  }

  private static _createSaveButton(scene: Phaser.Scene): Ui.Button {
    const button = new Ui.Button(scene, {text: 'save'}, 0, 0, 104, 40);
  
    return button;
  }

  private static _createBackButton(scene: Phaser.Scene): Ui.Button {
    const button = new Ui.Button(scene, {text: 'back'}, 0, 0, 104, 40);
  
    return button;
  } 
}