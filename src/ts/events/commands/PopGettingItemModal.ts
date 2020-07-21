import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';
import * as Model from '../../core/models';
import { GettingItemModal } from '../../ui/GettingItemModal';

enum Step {
  FadeinModal,
  WaitingKeyInput,
  FadeoutModal,
  Complete,
}

export class PopGettingItemModal implements Event.IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private itemId: number;
  private eventStep: Step;
  private modal: GettingItemModal;

  constructor(itemId: number) {
    this.isComplete = false;
    this.itemId = itemId;
    this.eventStep = Step.Complete;
    this.modal = null;
  }

  init(scene: Scene.IFieldScene): void {
    const itemObject = scene.gameGlobal.items.get(this.itemId);

    if (itemObject) {
      this.modal = this._createModal(scene, itemObject);

      // フェードイン演出のtweenをシーンに登録する
      scene.phaserScene.tweens.add({
        targets: this.modal,
        alpha: { from: 0, to: 1 },
        duration: 500,
        ease: Phaser.Math.Easing.Cubic.In,

        // 完了時にステップをWaitingKeyInputに変えるイベントを仕込んでおく
        onComplete: () => {
          this.eventStep = Step.WaitingKeyInput;
        },
      });

      // 完了時にステップをCompleteに変えるイベントを仕込んでおいたので、
      // ステップをFadeoutModalにしてtweenでステップがCompleteになるのを待つ
      this.eventStep = Step.FadeinModal;
      this.isComplete = false;
    } else {
      console.warn(`item id ${this.itemId} is not found. PopGettingItemModal will complete immediately.`);

      this.eventStep = Step.Complete;
      this.isComplete = true;
    }
  }

  update(scene: Scene.IFieldScene): void {
    switch (this.eventStep) {
      case Step.WaitingKeyInput:
        this._waitingKeyInput(scene);
        break;

      default:
        break;
    }
  }

  complete(): void {
    this.modal.destroy(true);
    this.modal = null;
    this.isComplete = true;
  }

  private _createModal(scene: Scene.IFieldScene, item: Model.Item): GettingItemModal {
    const config = {
      scene: scene.phaserScene,
      item: item,
      alpha: 0,
    };

    const modal = new GettingItemModal(config);

    const worldView = scene.phaserScene.cameras.main.worldView;
    const worldLeft = worldView.left;
    const worldTop = worldView.top;
    const worldWidth = worldView.width;
    const worldHeight = worldView.height;
    // x, y は中央寄せ
    const x = worldLeft + (worldWidth - modal.width) / 2;
    const y = worldTop + (worldHeight - modal.height) / 2;

    modal.x = x;
    modal.y = y;

    return modal;
  }

  private _waitingKeyInput(scene: Scene.IFieldScene): void {
    const keys = scene.keys;

    if (keys.action.isDown) {
      scene.phaserScene.tweens.add({
        targets: this.modal,
        alpha: { from: 1, to: 0 },
        duration: 300,
        ease: Phaser.Math.Easing.Back.Out,

        // 完了時にステップをCompleteに変えるイベントを仕込んでおく
        onComplete: () => {
          this.complete();
          this.eventStep = Step.Complete;
        },
      });

      // 完了時にステップをCompleteに変えるイベントを仕込んでおいたので、
      // ステップをFadeoutModalにしてtweenでステップがCompleteになるのを待つ
      this.eventStep = Step.FadeoutModal;
    }
  }
}
