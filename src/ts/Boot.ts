import * as Phaser from 'phaser';
import { TestScene } from './scenes/TestScene';
import { UiTest } from './scenes/UiTest';

export class Boot extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      render: {
        pixelArt: true,
        antialias: false,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0, x: 0},
          debug: true
        }
      },
    };

    super(config);

    this.scene.add('opening', TestScene, false);
  }
  
  on(): void {
    this.scene.start('opening');
  }
}