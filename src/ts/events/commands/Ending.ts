import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

export class Ending implements Event.IScenarioEvent {
  readonly isAsync = false;
  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    scene.phaserScene.scene.start('credit', {isEnding: true});

    this.complete();
  }

  update(): void {}

  complete(): void {
    this.isComplete = true;
  }
}
