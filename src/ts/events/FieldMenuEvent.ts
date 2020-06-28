import * as Ui from '../core/ui';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { IScenarioEvent } from '../core/events/IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../core/events/ScenarioEventUpdateConfig';

export class FieldMenuEvent implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private initCooldown: number;
  private fieldMenu: FieldMenu;
  private selector: Ui.ISelector;

  constructor() {
    this.fieldMenu = null;
    this.selector = null
    this.isComplete = false;
    this.initCooldown = 0;
  }

  init(config: ScenarioEventUpdateConfig): void {
    if (config.scene && config.gameGlobal && config.keys) {
      console.log('open field menu');

      this.isComplete = false;
      
      this.selector = Ui.SelectorFactory.create(config.scene, config.keys);
      this.fieldMenu = new FieldMenu({scene: config.scene, gameGlobal: config.gameGlobal});
      this.fieldMenu.registSelector(this.selector);

      // セレクターに、メインメニュー上でcancelするとこのイベントが終了する
      // イベントを登録する(eventが終了し uiが破壊される)
      this.selector.setRootCancelEvent(() => {
        console.log('close field menu');
        this.complete();
      });

      this.initCooldown = 15;
    
    } else {
      console.warn('can\'t init FieldMenuEvent because "scene" or "gameGlobal" or "keys" is null');
      this.isComplete = true;
    }
  };

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    // 開始してすぐに入力を受け付けると誤操作してしまうので開いてすぐあとにクールダウンを設ける
    if (this.initCooldown > 0) {
      this.initCooldown--;
      return;
    }

    if (this.isComplete || !this.fieldMenu) return;

    this.selector.update(frame);
  };

  complete(): void {
    this.fieldMenu.destroy();
    this.fieldMenu = null;
    this.selector.destroy();
    this.selector = null;
    this.isComplete = true;
  };
}
