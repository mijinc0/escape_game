import * as Phaser from 'phaser';
import { FieldMenu } from './FieldMenu';
import { Keys } from '../../core/input/Keys';
import { Button } from '../../core/ui/objects/Button';
import { NodeStatus } from '../../core/ui/NodeStatus';
import { ContainerFactory } from '../../core/ui/containers/ContainerFactory';

export class FieldMenuFactory {
  static create(scene: Phaser.Scene, keys?: Keys): FieldMenu {
    const fieldMenu = new FieldMenu(scene, keys);

    const itemButton = this._createItemButton(scene);
    const saveButton = this._createSaveButton(scene);
    const backButton = this._createBackButton(scene);

    return fieldMenu;
  }

  private static _createItemButton(scene: Phaser.Scene): Button {
    const button = new Button(scene, {text: 'item'}, 104, 64);

    const itemContainer = ContainerFactory.createDownRange(320, 240, 10, 100, 100, 10);
    itemContainer.setStatus(NodeStatus.Invisible);

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