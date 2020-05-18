import * as Phaser from 'phaser';
import { Message } from './Message';

export class SceneCommandsFactory {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  message(
    message: string,
    async = false,
    align = 'left',
    hasBackground = true,
    justify = 'bottom'
  ): Message {
    return new Message(this.scene, message, async, align, hasBackground, justify);
  }
}