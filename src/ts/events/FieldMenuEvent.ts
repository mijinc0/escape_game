import * as Ui from '../core/ui';
import * as Asset from '../core/assets';
import * as Event from '../core/events';
import * as Scene from '../core/scenes';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { GameConfig } from '../ui/gameConfig/GameConfig';

export class FieldMenuEvent implements Event.IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private initCooldown: number;
  private fieldMenu: FieldMenu;
  private selector: Ui.ISelector;

  constructor() {
    this.fieldMenu = null;
    this.selector = null;
    this.isComplete = false;
    this.initCooldown = 0;
  }

  init(scene: Scene.IFieldScene): void {
    console.log('open field menu');

    this.isComplete = false;

    const seConfig = {};
    scene.audioManager.playSe(Asset.AssetCacheKey.audio('se_open_fieldmenu'), seConfig);

    this.selector = Ui.SelectorFactory.create(scene.customScene.ui.phaserScene, scene.keys);

    this.fieldMenu = new FieldMenu({
      scene: scene.customScene.ui.phaserScene,
      gameGlobal: scene.gameGlobal,
    });

    // Backボタンとselectorにmenuを閉じるイベントをそれぞれ設定する
    this.fieldMenu.mainMenu.backButton.on(Ui.ElementEventNames.Select, this._closeMenu.bind(this));
    this.fieldMenu.mainMenu.configButton.on(Ui.ElementEventNames.Select, () => {
      console.log('open game config');

      const config = {
        scene: scene.customScene.ui.phaserScene,
        gameGlobal: scene.gameGlobal,
      };

      const gameConfig = new GameConfig(config, 100, 120);

      gameConfig.mainConfig.addPlayingTestSeEvent(() => {
        scene.audioManager.playSe(Asset.AssetCacheKey.audio('se_open_fieldmenu'), {});
      });

      this.selector.setGroup(gameConfig.mainConfig, [gameConfig]);
    });

    this.selector.setRootCancelEvent(this._closeMenu.bind(this));

    this.fieldMenu.registSelector(this.selector);

    // set SE
    Ui.SelectorSeRegistrar.regist(this.selector, scene.audioManager);

    this.initCooldown = 15;
  }

  update(scene: Scene.IFieldScene): void {
    // 開始してすぐに入力を受け付けると誤操作してしまうので開いてすぐあとにクールダウンを設ける
    if (this.initCooldown > 0) {
      this.initCooldown--;
      return;
    }

    if (this.isComplete || !this.fieldMenu) return;

    this.selector.update(scene.frame);
  }

  complete(): void {
    this.fieldMenu.destroy();
    this.fieldMenu = null;
    this.selector.destroy();
    this.selector = null;
    this.isComplete = true;
  }

  private _closeMenu(): void {
    console.log('close field menu');
    this.complete();
  }
}
