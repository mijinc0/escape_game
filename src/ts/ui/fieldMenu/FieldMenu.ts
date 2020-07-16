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
  readonly mainMenu: MainMenu;

  constructor(config: FieldMenuConfig) {
    // カメラ描写範囲の左上を基準値とする
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
    const width = 600;
    const height = 432;
    // xは中央合わせ
    const x = (this.width - width) / 2;
    // yは適当だが、mainMenuを囲える位置
    const y = 16;

    const rectangle = new Ui.Rectangle(config.scene, x, y, width, height, 0x000000, 0.5); 
    
    rectangle.setOrigin(0);
    UiRenderOrder.base(rectangle);
    config.scene.add.existing(rectangle);

    return rectangle;
  }

  private _createMainMenu(config: FieldMenuConfig): MainMenu {
    const mainMenu = new MainMenu(config);

    // xは中央合わせ
    const mainMenuX = (this.width - mainMenu.width) / 2;
    // yは適当
    const mainMenuY = 32;

    mainMenu.x = mainMenuX;
    mainMenu.y = mainMenuY;

    return mainMenu;
  }
}