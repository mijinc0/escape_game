import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import * as Render from '../../core/renders';
import * as Util from '../../core/utils';
import { MainConfig } from './MainConfig';
import { Button } from '../Button';
import { ProgressBar } from '../ProgressBar';
import { IGameGlobal } from '../../core/IGameGlobal';

type GameConfigConfig = {
  scene: Phaser.Scene,
  gameGlobal: IGameGlobal,
};

/**
 * 各サイズは固定
 */
export class GameConfig extends Ui.Group {
  mainConfig: MainConfig;

  constructor(config: GameConfigConfig, dx = 0, dy = 0, anchor?: Ui.IElement) {
    const width = 400;
    const height = 168;

    super(dx, dy, width, height, anchor);

    this._init(config);
  }

  private _init(config: GameConfigConfig): void {
    const scene = config.scene;

    // base rectangle
    const baseRectangle = new Ui.Rectangle(scene, 0, 0, this.width, this.height, 0x000000, 0.9);
    baseRectangle.setOrigin(0);
    scene.add.existing(baseRectangle);

    // title text
    const titleTextConfig = {
      fontSize: '20px',
      fontFamily: 'san-serif',
    };
    const titleText = new Ui.Text(scene, 32, 16, 'Audio Config', titleTextConfig);
    titleText.setOrigin(0);
    scene.add.existing(titleText);

    // sub texts
    const subTextConfig = {
      fontSize: '16px',
      fontFamily: 'san-serif',
    };

    const subTextBgm = new Ui.Text(scene, 56, 60, 'SE', subTextConfig);
    subTextBgm.setOrigin(0);
    scene.add.existing(subTextBgm);

    const subTextSe = new Ui.Text(scene, 56, 106, 'BGM', subTextConfig)
    subTextSe.setOrigin(0);
    scene.add.existing(subTextSe);   

    // set depth
    Render.UiRenderOrder.base(baseRectangle, subTextBgm, subTextSe, titleText);
    
    // main menu
    this.mainConfig = new MainConfig(config, 50, 82);
    
    this.push(baseRectangle, titleText, subTextBgm, subTextSe, this.mainConfig);
  }
}
