import * as Phaser from 'phaser';
import { GameGlobal } from './GameGlobal';
import { TestScene } from './scenes/TestScene';
import { GameFlags } from './models/GameFlags';
import { GameVariables } from './models/GameVariables';
import { GameItems } from './models/GameItems';

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