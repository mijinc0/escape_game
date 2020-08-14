import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import * as Asset from '../core/assets';
import * as Audio from '../core/audios';
import { GameGlobal } from '../GameGlobal';
import { IGameGlobal } from '../core/IGameGlobal';
import { GameConfig } from '../ui/gameConfig/GameConfig';

export class UiTest extends Phaser.Scene {
  frame = 0;

  gameGlobal: IGameGlobal;

  selector: Ui.ISelector;

  init(): void {
    console.log('== start scene UiTest ==');

    this.gameGlobal = GameGlobal;
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0xaadd66);

    // 画面サイズ
    const width = 640;
    const height = 480;

    const audioManager = new Audio.AudioManager(this, GameGlobal.audioConfig);

    const config = {
      scene: this,
      gameGlobal: GameGlobal,
    };

    const ui = new GameConfig(config, 50, 50);

    ui.mainConfig.addPlayingTestSeEvent(() => {
      audioManager.playSe(Asset.AssetCacheKey.audio('se_open_fieldmenu'), {});
    });

    this.selector = Ui.SelectorFactory.create(this);

    this.selector.setGroup(ui.mainConfig);
  }

  update(): void {
    this.frame++;

    if (this.selector) {
      this.selector.update();
    }
  }
}
