import * as Phaser from 'phaser';
import { Message } from './Message';
import { Item } from './Item';
import { GameGlobal } from '../../GameGlobal';

export class SceneCommandsFactory {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  message(
    message: string,
    isAsync = false,
    align = 'left',
    hasBackground = true,
    justify = 'bottom'
  ): Message {
    return new Message(this.scene, message, isAsync, align, hasBackground, justify);
  }

  item(
    itemName: string,
    delta: number,
    isAsync = false
  ): Item {
    return new Item(GameGlobal, itemName, delta, isAsync);
  }
}