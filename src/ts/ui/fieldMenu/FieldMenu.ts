import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { Button } from '../Button';

type FieldMenuConfig = {
  scene: Phaser.Scene,
};

type ButtonConfig = {
  scene: Phaser.Scene,
  text: string,
  fontSize?: string,
  fontColor?: string,
  fontFamilly?: string,
  backgroundColor?: number,
  backgroundAlpha?: number,
};

/*
export class FieldMenu extends Ui.AbsComponentGroup<FieldMenuConfig> {
  itemButton: Button;
  
  saveButton: Button;
  
  backButton: Button;

  protected init(config: FieldMenuConfig): void {
    const mainMenu = this._createMainMenu(config);
  }

  private _createMainMenu(config: FieldMenuConfig): Ui.Group {
    const menuButtonMargin = 10;
    const ah = new Ui.RangeAlignmentHandler(menuButtonMargin, Ui.Direction.Down);
    const mainMenu = new Ui.Group(0, 0, 160, 0, null, ah);
    
    const buttonHeight = 48;
    const buttonConfig = {
      scene: config.scene,
      text: '',
      fontSize: '20px',
      fontColor: 'white',
      fontFamilly: 'monospace',
      backgroundColor: 0x000000,
      backgroundAlpha: 0.9,
    };
    this.itemButton = this._createItemButton(buttonConfig, mainMenu.width, buttonHeight);
    // saveとbackの内容はeventの中で付けるのでここでは空のボタン
    this.saveButton = new Button(buttonConfig, 0, 0, mainMenu.width, buttonHeight);
    this.backButton = new Button(buttonConfig, 0, 0, mainMenu.width, buttonHeight);

    mainMenu.push(this.itemButton, this.saveButton, this.backButton);

    return mainMenu;
  }

  private _createItemButton(config: ButtonConfig, width: number, height: number): Button {
    const button = new Button(config, 0, 0, width, height);

    button.on(Ui.SelectorEventNames.Select, (thisButton: Ui.IElement, selector: Ui.ISelector) => {
      const itemMenu = new ItemMenu();

      selector.setGroup(itemMenu.list, [itemMenu]);
    });

    return button;
  }
}
*/