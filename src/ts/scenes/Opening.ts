import * as Phaser from 'phaser';
import * as Asset from '../core/assets';
import * as Ui from '../core/ui';
import * as Model from '../core/models';
import * as Scene from '../core/scenes';
import { GameGlobal } from '../GameGlobal';
import { Button } from '../ui/Button';
import { GameConfig } from '../ui/gameConfig/GameConfig';
import { FieldIds } from '../fields/FieldIds';

export class Opening extends Phaser.Scene implements Scene.ICustomScene {
  readonly type = Scene.SceneType.Opening;

  private frame: number;
  private selector: Ui.ISelector;
  private selectable: boolean;
  private customScene: Scene.ICustomSceneManager;

  init(): void {
    console.log('== start scene Opening ==');
  }

  create(): void {
    this.frame = -1;
    this.selectable = false;
    this.selector = Ui.SelectorFactory.create(this);
    this.customScene = new Scene.CustomSceneManager(this);

    // add title image & text
    const centerX = 320;
    const titleImage = this.add.image(0, 0, Asset.AssetCacheKey.image('titleImage'));
    titleImage.setOrigin(0);

    const title = 'Stay Home';
    const textConfig = {
      fontFamily: 'san-serif',
      fontSize: '40px',
      align: 'center',
    };
    const titleText = this.add.text(centerX, 92, title, textConfig);
    titleText.setOrigin(0.5);

    // add menu
    const menu = this._createMenu(320 - 76, 340);

    this._setSelectorSounds(this.selector);
    this.selector.setGroup(menu);
    
    // stop bgm
    const uiScene = this.customScene.ui;
    if (uiScene) {
      uiScene.audioManager.stopBgm();
    }

    // start
    this.cameras.main.fadeIn(1000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
      if (progress === 1) {
        this.selectable = true;
      }
    });
  }

  update(): void {
    this.frame++;

    if (!this.selectable) return;

    this.selector.update(this.frame);
  }

  private _createMenu(x: number, y: number): Ui.Group {
    const buttonMargin = 4;
    const ah = new Ui.RangeAlignmentHandler(buttonMargin, Model.Direction.Down);
    const menu = new Ui.Group(x, y, 160, 96, null, ah);

    const newgameButton = this._createNewgameButton();
    const continueButton = this._createConfigButton();
    const creditButton = this._createCreditButton();

    menu.push(newgameButton, continueButton, creditButton);

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

    const button = new Button(buttonConfig, 0, 0, 144, 40);

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

  private _createConfigButton(): Button {
    const buttonConfig = {
      scene: this,
      text: 'Config',
      fontSize: '24px',
      fontFamily: 'serif',
      backgroundAlpha: 0,
    };

    const button = new Button(buttonConfig, 0, 0, 144, 40);

    button.on(Ui.ElementEventNames.Select, () => {
      const config = {
        scene: this,
        gameGlobal: GameGlobal,
      };
      const gameConfig = new GameConfig(config, 16, 16);

      gameConfig.mainConfig.addPlayingTestSeEvent(() => {
        this.customScene.ui.audioManager.playSe(Asset.AssetCacheKey.audio('se_open_fieldmenu'), {});
      });

      this.selector.setGroup(gameConfig.mainConfig, [gameConfig]);
    });

    return button;
  }

  private _createCreditButton(): Button {
    const buttonConfig = {
      scene: this,
      text: 'Credit',
      fontSize: '24px',
      fontFamily: 'serif',
      backgroundAlpha: 0,
    };

    const button = new Button(buttonConfig, 0, 0, 144, 40);

    button.on(Ui.ElementEventNames.Select, () => {
      this.selectable = false;
      this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress === 1) {
          this.scene.start('credit');
        }
      });
    });

    return button;
  }

  private _setSelectorSounds(selector: Ui.ISelector): void {
    Ui.SelectorSeRegistrar.regist(selector, this.customScene.ui.audioManager);
  }
}
