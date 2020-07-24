import * as Phaser from 'phaser';
import * as Asset from './core/assets';
import { GameAssets } from './GameAssets';
import { GameFlagKeys } from './GameFlagKeys';
import { GameGlobal } from './GameGlobal';
import { IGameGlobal } from './core/IGameGlobal';
import { GameItemIds } from './items/GameItemIds';
import { TestScene } from './scenes/TestScene';
import { Loading } from './scenes/Loading';
import { Opening } from './scenes/Opening';
import { UiTest } from './scenes/UiTest';

export class Boot extends Phaser.Game {
  /**
   * デバッグ時にフラグを触れるようにプロパティを作っておく
   * (chromeのDeveloper toolsのコンソールから操作できる)
   */
  readonly gameGlobal: IGameGlobal;

  constructor() {
    const debugMode = true;

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
          gravity: { y: 0, x: 0 },
          debug: debugMode,
        },
      },
    };

    super(config);

    this.gameGlobal = GameGlobal;

    this.scene.add('opening', Opening, false);
    this.scene.add('loading', Loading, false);
    this.scene.add('field', TestScene, false);
    this.scene.add('test_ui', UiTest, false);

    if (debugMode) {
      this._debugInit();
    }
  }

  on(): void {
    const assetLoadingConfig: Asset.IAssetLoadingConfig = {
      nextScene: 'opening',

      tileMap: GameAssets.tileMap,

      tileImage: GameAssets.tileImage,

      tileInfo: GameAssets.tileInfo,

      itemIcon: GameAssets.itemIcon,

      audio: GameAssets.audio,

      spritesheet: GameAssets.spritesheet,
    };

    this.scene.start('loading', assetLoadingConfig);
  }

  /**
   * デバッグモード時に最初にやっておきたいセッティング(フラグなど)を
   * まとめてハードコードしておく場所
   */
  private _debugInit(): void {
    this.gameGlobal.flags.on(GameFlagKeys.Opening);
    this.gameGlobal.flags.on(GameFlagKeys.ReadRoomAMemo);

    [
      this.gameGlobal.items.get(GameItemIds.KeyRoomBC),
      this.gameGlobal.items.get(GameItemIds.KeyRoomD),
      this.gameGlobal.items.get(GameItemIds.KeyRoomFG),
      this.gameGlobal.items.get(GameItemIds.KeyStoreroom),
      this.gameGlobal.items.get(GameItemIds.KeyRoomE),
    ].forEach((item) => {
      this.gameGlobal.ownItems.add(item, 1);
    });
  }
}
