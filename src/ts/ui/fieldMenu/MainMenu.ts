import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { ItemMenu } from './ItemMenu';
import { Button } from '../Button';
import { IGameGlobal } from '../../core/IGameGlobal';

type FieldMenuConfig = {
  scene: Phaser.Scene,
  gameGlobal: IGameGlobal,
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

export class MainMenu extends Ui.Group {
  itemButton: Button;
  
  saveButton: Button;
  
  backButton: Button;

  constructor(config: FieldMenuConfig, dx = 0, dy = 0, anchor?: Ui.IElement) {
    const width = 560;
    const height = 48;
    super(dx, dy, width, height, anchor);

    this.entries = [];
    this.currentIndex = -1;

    const menuButtonMargin = 16;
    this.alignmentHandler = new Ui.RangeAlignmentHandler(menuButtonMargin, Ui.Direction.Right);

    this._init(config);
  }

  private _init(config: FieldMenuConfig): void {
    const buttonWidth = 176;
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

    buttonConfig.text = 'ITEM';
    this.itemButton = this._createItemButton(config, buttonConfig, buttonWidth, buttonHeight);
    
    // saveとbackの内容はeventの中で付けるのでここでは空のボタン
    buttonConfig.text = 'SAVE';
    this.saveButton = new Button(buttonConfig, 0, 0, buttonWidth, buttonHeight);

    buttonConfig.text = 'BACK';
    this.backButton = new Button(buttonConfig, 0, 0, buttonWidth, buttonHeight);

    this.push(this.itemButton, this.saveButton, this.backButton);
  }

  private _createItemButton(fieldMenuConfig: FieldMenuConfig, buttonConfig: ButtonConfig, width: number, height: number): Button {
    const button = new Button(buttonConfig, 0, 0, width, height);

    // selectでitemListを開くイベント
    button.on(Ui.SelectorEventNames.Select, (thisButton: Ui.IElement, selector: Ui.ISelector) => {
      const itemMenuConfig = {
        scene: fieldMenuConfig.scene,
        items: fieldMenuConfig.gameGlobal.ownItems.getAll(),
      };

      const itemMenu = new ItemMenu(itemMenuConfig, 0, 80);
      
      itemMenu.anchor = this;

      selector.setGroup(itemMenu.list, [itemMenu]);
    });

    return button;
  }
}