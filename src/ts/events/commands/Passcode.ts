import * as Ui from '../../core/ui';
import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';
import { Passcode as UiPasscode } from '../../ui/passcode/Passcode';

export class Passcode implements IScenarioEvent {
  readonly isAsync  = false;

  isComplete: boolean;

  private digits: number;
  private resultValueKey: number;
  private selector: Ui.ISelector;
  private uiComponent: UiPasscode;

  constructor(digits: number, resultValueKey: number) {
    this.digits = digits;
    this.resultValueKey = resultValueKey;
    this.isComplete = false;
    this.selector = null;
    this.uiComponent = null;;
  }

  init(scene: IFieldScene): void {
    this.isComplete = false;

    this.selector = this._createSelector(scene);
    this.uiComponent = this._createUiComponent(scene);

    scene.gameGlobal.variables.set(this.resultValueKey, -1);

    this.uiComponent.registToSelector(this.selector);
  }

  update(scene: IFieldScene): void {
    if (this.isComplete) return;

    this.selector.update(scene.frame);
  }

  complete(): void {
    this.isComplete = true;
    this.selector.destroy(true);
    this.uiComponent.destroy(true);
    this.selector = null;
    this.uiComponent = null;
  }

  private _createSelector(scene: IFieldScene): Ui.ISelector {
    const selector = Ui.SelectorFactory.create(scene.phaserScene, scene.keys);

    Ui.SelectorSeRegistrar.regist(selector, scene.audioManager);

    return selector;
  }

  private _createUiComponent(scene: IFieldScene): UiPasscode {
    const worldView = scene.phaserScene.cameras.main.worldView;

    const config = {
      scene: scene.phaserScene,
      digits: this.digits,
    };

    const uiComponent = new UiPasscode(config, 0, 0);

    uiComponent.x = worldView.x + ((worldView.width - uiComponent.width) / 2);
    uiComponent.y = worldView.y + ((worldView.height - uiComponent.height) / 2);

    // enterボタンが押されたらGameVariablesに指定のキーで値を格納してcompleteするイベントを仕込む
    uiComponent.addSelectEnterButtonEvent((() => {
      scene.gameGlobal.variables.set(this.resultValueKey, uiComponent.getPasscode());
      this.complete();
    }).bind(this));

    return uiComponent;
  }
}
