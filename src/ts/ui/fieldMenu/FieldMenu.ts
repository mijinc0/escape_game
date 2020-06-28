import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { MainMenu } from './MainMenu';
import { IGameGlobal } from '../../core/IGameGlobal';

type FieldMenuConfig = {
  scene: Phaser.Scene,
  gameGlobal: IGameGlobal,
};

export class FieldMenu extends Ui.Group {
  private readonly mainMenu: Ui.Group;

  constructor(config: FieldMenuConfig) {
    // カメラの基準値を(0, 0)とする
    const worldView = config.scene.cameras.main.worldView;
    super(worldView.x, worldView.y, worldView.width, worldView.height);

    this.mainMenu = new MainMenu(config);

    // xは中央合わせ
    const mainMenuX = (this.width - this.mainMenu.width) / 2;
    // yは適当(暫定値)
    const mainMenuY = 40;

    this.mainMenu.x = mainMenuX;
    this.mainMenu.y = mainMenuY;

    this.push(this.mainMenu);
  }

  registSelector(selector: Ui.ISelector): void {
    selector.setGroup(this.mainMenu);
  }
}