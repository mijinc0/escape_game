import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

/**
 * 夜間のような効果をカメラに加える
 */
export class CameraEffectNight implements Event.IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: Scene.IFieldScene, time: number, delta: number): void {
    if (this.isComplete) return;

    const primaryActor = scene.primaryActor;

    scene.cameraEffectManager.startEffect('nightEffect', primaryActor.sprite);

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}
