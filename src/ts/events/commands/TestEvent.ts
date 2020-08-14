import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

/**
 * 色々試す時に使うイベント(本編では不要)
 */
export class TestEvent implements Event.IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  constructor() {}

  init(scene: Scene.IFieldScene): void {
    const primaryActor = scene.primaryActor;

    (<any>primaryActor.sprite).tint = 0x555555;

    this.complete();
  }

  update(scenes: Scene.IFieldScene, time: number, delta: number): void {}

  complete(): void {
    this.isComplete = true;
  }
}
