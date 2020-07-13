import * as Ui from '../core/ui';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { IScenarioEvent } from '../core/events/IScenarioEvent';
import { IFieldScene } from '../core/scenes/IFieldScene';

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

  init(scene: IFieldScene): void {
    console.log('open field menu');

    this.isComplete = false;
    
    this.selector = Ui.SelectorFactory.create(scene.phaserScene, scene.keys);
    // NOTE: IFieldScene一つに変更可能だが暫定的に維持
    this.fieldMenu = new FieldMenu({scene: scene.phaserScene, gameGlobal: scene.gameGlobal});
    
    // Backボタンとselectorにmenuを閉じるイベントをそれぞれ設定する
    this.fieldMenu.mainMenu.backButton.on(Ui.SelectorEventNames.Select, this.closeMenu.bind(this));
    this.selector.setRootCancelEvent(this.closeMenu.bind(this));
    
    this.fieldMenu.registSelector(this.selector);
    this.initCooldown = 15;
  };

  update(scene: IFieldScene): void {
    // 開始してすぐに入力を受け付けると誤操作してしまうので開いてすぐあとにクールダウンを設ける
    if (this.initCooldown > 0) {
      this.initCooldown--;
      return;
    }

    if (this.isComplete || !this.fieldMenu) return;

    this.selector.update(scene.frame);
  };

  complete(): void {
    this.fieldMenu.destroy();
    this.fieldMenu = null;
    this.selector.destroy();
    this.selector = null;
    this.isComplete = true;
  };

  private closeMenu(): void {
    console.log('close field menu');
    this.complete();
  }
}
