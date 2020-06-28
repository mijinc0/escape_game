import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { MainMenu } from './MainMenu';
import { IGameGlobal } from '../../core/IGameGlobal';
import { UiRenderOrder } from '../../core/renders/UiRenderOrder';

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

    const menuBackGround = this._createMenuBackGround(config);
    
    this.mainMenu = this._createMainMenu(config);

    this.push(this.mainMenu, menuBackGround);
  }

  registSelector(selector: Ui.ISelector): void {
    selector.setGroup(this.mainMenu);
  }

  private _createMenuBackGround(config: FieldMenuConfig): Ui.Rectangle {
    const width = 760;
    const height = 432;
    // xは中央合わせ
    const x = (this.width - width) / 2;
    // yは適当だが、mainMenuを囲える位置
    const y = 80 - 16;

    const rectangle = new Ui.Rectangle(config.scene, x, y, width, height, 0x000000, 0.7); 
    
    rectangle.setOrigin(0);
    UiRenderOrder.base(rectangle);
    config.scene.add.existing(rectangle);

    return rectangle;
  }

  private _createMainMenu(config: FieldMenuConfig): Ui.Group {
    const mainMenu = new MainMenu(config);

    // xは中央合わせ
    const mainMenuX = (this.width - mainMenu.width) / 2;
    // yは適当
    const mainMenuY = 80;

    mainMenu.x = mainMenuX;
    mainMenu.y = mainMenuY;

    return mainMenu;
  }
}