import * as Phaser from 'phaser';
import * as Audio from '../core/audios';
import * as Ui from '../core/ui';
import * as Model from '../core/models';
import * as Scene from '../core/scenes';
import { GameGlobal } from '../GameGlobal';
import { Button } from '../ui/Button';
import { FieldIds } from '../fields/FieldIds';

export class Opening extends Phaser.Scene {
  private frame: number;
  private selector: Ui.ISelector;
  private audioManager: Audio.AudioManager;
  private startOpening: boolean;

  init(): void {
    console.log('== start scene Opening ==');
  }

  create(): void {
    this.frame = -1;
    this.startOpening = false;
    this.selector = Ui.SelectorFactory.create(this);
    this.audioManager = new Audio.AudioManager(this, 1, 1);

    const menu = this._createMenu(440, 320);

    this._setSelectorSounds(this.selector);
    this.selector.setGroup(menu);
    
    this.cameras.main.fadeIn(1000, 0, 0, 0, ((camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
      if (progress === 1) {
        this.startOpening = true;
      }
    }).bind(this));
  }

  update(): void {
    this.frame++;

    if (!this.startOpening) return;

    this.selector.update(this.frame);
  }

  private _createMenu(x: number, y: number): Ui.Group {
    const buttonMargin = 16;
    const ah = new Ui.RangeAlignmentHandler(buttonMargin, Model.Direction.Down);
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

    button.on(Ui.ElementEventNames.Select, () => {
      const initFieldId = GameGlobal.debug ? FieldIds.Debugroom : FieldIds.RoomA;

      const fieldConfig: Scene.IFieldSceneConfig = {
        fieldId: initFieldId,
        heroX: 306,
        heroY: 270,
        heroDirection: Model.Direction.Down,
      };

      this.selector.disable = true;

      this.cameras.main.fadeOut(800, 0, 0, 0, (camera: any, progress: number) => {
        if (progress === 1) {
          this.scene.start('field', fieldConfig);
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

  private _setSelectorSounds(selector: Ui.ISelector): void {
    Ui.SelectorSeRegistrar.regist(selector, this.audioManager);
  }
}
