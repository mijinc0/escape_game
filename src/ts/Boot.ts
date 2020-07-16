import * as Phaser from 'phaser';
import { GameAssets } from './GameAssets';
import { IAssetLoadingConfig } from './core/assets/IAssetLoadingConfig';
import { TestScene } from './scenes/TestScene';
import { Loading } from './scenes/Loading';
import { Opening } from './scenes/Opening';
import { UiTest } from './scenes/UiTest';

export class Boot extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 640,
      height: 480,
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

    this.scene.add('opening', Opening, false);
    this.scene.add('loading', Loading, false);
    this.scene.add('field', TestScene, false);
    this.scene.add('test_ui', UiTest, false);
  }
  
  on(): void {
    const assetLoadingConfig: IAssetLoadingConfig = {
      nextScene: 'opening',

      tileMap: GameAssets.tileMap,
  
      tileImage: GameAssets.tileImage,
    
      tileInfo: GameAssets.tileInfo,
    
      itemIcon: GameAssets.itemIcon,
      
      spritesheet: GameAssets.spritesheet,
    };

    this.scene.start('loading', assetLoadingConfig);
  }
}