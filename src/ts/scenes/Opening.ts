import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import { Button } from '../ui/Button';
import { Direction } from '../core/models/Direction';
import { SceneData } from '../core/models/SceneData';

export class Opening extends Phaser.Scene {
  private frame: number;

  private selector: Ui.ISelector;

  init(): void {
    console.log('== start scene Opening ==');
  }

  preload (): void {

  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);
    
    this.frame = -1;
    this.selector = Ui.SelectorFactory.create(this);

    const menu = this._createMenu(440, 320);

    this.selector.setGroup(menu);
  }
  
  update(): void {
    this.frame++;

    // 誤操作防止の為に開始直後に休止時間をを設ける
    if (this.frame < 20) return;

    this.selector.update(this.frame);
  }

  private _createMenu(x: number, y: number): Ui.Group {
    const buttonMargin = 16;
    const ah = new Ui.RangeAlignmentHandler(buttonMargin, Direction.Down);
    const menu = new Ui.Group(x, y, 160, 96, null, ah);

    const newgameButton = this._createNewgameButton();
    const continueButton = this._createContinueButton();
    
    menu.push(newgameButton, continueButton);

    return menu;
  }

  private _createNewgameButton(): Button {
    const buttonConfig = {
      scene: this,
      text: 'NewGame',
      fontSize: '24px',
      fontFamily: 'serif',
      backgroundAlpha: 0,
    };

    const button = new Button(buttonConfig, 0, 0, 160, 40);

    button.on(Ui.SelectorEventNames.Select, () => {
      const initAreaId = -1;
      const initHeroX = 300;
      const initHeroY = 200;
      const initHeroDirection = Direction.Down;
      const data = new SceneData(initAreaId, initHeroX, initHeroY, initHeroDirection);

      this.selector.disable = true;

      this.cameras.main.fadeOut(2000, 0, 0, 0, (camera: any, progress: number) => {
        if (progress === 1) {
          this.scene.start('field', data);
        }
      });
    });

    return button;
  }

  private _createContinueButton(): Button {
    const buttonConfig = {
      scene: this,
      text: 'Continue',
      fontSize: '24px',
      fontFamily: 'serif',
      backgroundAlpha: 0,
    };

    const button = new Button(buttonConfig, 0, 0, 160, 40);

    return button;
  }
}