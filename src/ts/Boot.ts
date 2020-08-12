import * as Phaser from 'phaser';
import * as Asset from './core/assets';
import { GameAssets } from './GameAssets';
import { GameFlagKeys } from './GameFlagKeys';
import { GameGlobal } from './GameGlobal';
import { IGameGlobal } from './core/IGameGlobal';
import { GameItemIds } from './items/GameItemIds';
import { GameField } from './scenes/GameField';
import { Loading } from './scenes/Loading';
import { Opening } from './scenes/Opening';
import { Ending } from './scenes/Ending';
import { UiTest } from './scenes/UiTest';
import { Ui } from './scenes/Ui';

export class Boot extends Phaser.Game {
  /**
   * デバッグ時にフラグを触れるようにプロパティを作っておく
   * (chromeのDeveloper toolsのコンソールから操作できる)
   */
  readonly gameGlobal: IGameGlobal;

  constructor() {
    GameGlobal.debug = false;

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
          debug: GameGlobal.debug,
        },
      },
    };

    super(config);

    this.gameGlobal = GameGlobal;

    // NOTE: 複数のシーンを同時に動かした時、ここでaddしている順に描写の順番が決まる。
    // (最初にaddしたものが先に描写される。つまり重なった時に下に表示される。)
    this.scene.add('loading', Loading, false);
    this.scene.add('field', GameField, false);
    this.scene.add('opening', Opening, false);
    this.scene.add('ending', Ending, false);
    this.scene.add('ui', Ui, false);
    this.scene.add('test_ui', UiTest, false);

    if (GameGlobal.debug) {
      this._debugInit();
    }
  }

  on(): void {
    console.log('== Boot Game ==');

    const assetLoadingConfig: Asset.IAssetLoadingConfig = {
      nextScene: 'opening',

      tileMap: GameAssets.tileMap,

      tileImage: GameAssets.tileImage,

      tileInfo: GameAssets.tileInfo,

      itemIcon: GameAssets.itemIcon,

      audio: GameAssets.audio,

      spritesheet: GameAssets.spritesheet,
    };

    this.scene.run('ui');
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
      this.gameGlobal.items.get(GameItemIds.KeyRoomA),
      this.gameGlobal.items.get(GameItemIds.KeyRoomBC),
      this.gameGlobal.items.get(GameItemIds.KeyRoomD),
      this.gameGlobal.items.get(GameItemIds.KeyRoomFG),
      this.gameGlobal.items.get(GameItemIds.KeyStoreroom),
      this.gameGlobal.items.get(GameItemIds.KeyRoomE),
      this.gameGlobal.items.get(GameItemIds.Barl),
      this.gameGlobal.items.get(GameItemIds.RoomGSafetyboxKey),
      this.gameGlobal.items.get(GameItemIds.Lighter),
      this.gameGlobal.items.get(GameItemIds.LighterOil),
    ].forEach((item) => {
      this.gameGlobal.ownItems.add(item, 1);
    });
  }
}
