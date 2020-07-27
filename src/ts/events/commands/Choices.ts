import * as Ui from '../../core/ui';
import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';
import { Choices as UiChoices } from '../../ui/choices/Choices';

export class Choices implements IScenarioEvent {
  readonly isAsync  = false;

  isComplete: boolean;

  private message: string;
  private items: string[];
  private resultValueKey: number;
  private defaultValue: number|null;
  private selector: Ui.ISelector;
  private uiComponent: UiChoices;

  constructor(message: string, items: string[], resultValueKey: number, defaultValue?: number) {
    this.message = message;
    this.items = items;
    this.resultValueKey = resultValueKey;
    this.defaultValue = defaultValue ? defaultValue : null;
    this.isComplete = false;
    this.selector = null;
    this.uiComponent = null;;
  }

  init(scene: IFieldScene): void {
    this.isComplete = false;

    this.selector = this._createSelector(scene);
    this.uiComponent = this._createUiComponent(scene);

    scene.gameGlobal.variables.set(this.resultValueKey, this.defaultValue);

    this.selector.setGroup(this.uiComponent.choices);
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

    selector.on(Ui.SelectorEventNames.RootGroupCanceled, (() => {
      // defaultValueが設定されていない場合はキャンセルでの終了は無し
      // defaultValueが設定されている場合はcomplete。結果はinitで設定されたdefaultValueとなる。
      if (this.defaultValue === null) return;

      this.complete();
    }).bind(this));

    Ui.SelectorSeRegistrar.regist(selector, scene.audioManager);

    return selector;
  }

  private _createUiComponent(scene: IFieldScene): UiChoices {
    const worldView = scene.phaserScene.cameras.main.worldView;

    const x = worldView.x;
    const y = worldView.y + 64;
    const width = worldView.width;
    const height = worldView.height;

    const config = {
      scene: scene.phaserScene,
      message: this.message,
      items: this.items,
    };

    const uiComponent = new UiChoices(config, x, y, width, height);

    uiComponent.choices.entries.forEach(((button: Ui.IElement, index: number) => {
      this._setButtonSelectEvent(button, index, scene);
    }).bind(this));

    return uiComponent;
  }


  private _setButtonSelectEvent(button: Ui.IElement, index: number, scene: IFieldScene): void {
    button.on(Ui.ElementEventNames.Select, (() => {
      scene.gameGlobal.variables.set(this.resultValueKey, index);
      this.complete();
    }).bind(this));
  }
}
