import * as Camera from '../../core/cameras';
import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

/**
 * 色々試す時に使うイベント(本編では不要)
 */
export class TestEvent implements Event.IScenarioEvent {
  readonly isAsync: boolean;

  isComplete: boolean;

  constructor(isAsync?: boolean) {
    this.isAsync = isAsync ? isAsync : false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    if (scene.cameraEffectManager instanceof Camera.DefaultCameraEffectManager) {
      scene.cameraEffectManager.fadeIn(1000, this.complete.bind(this));
    }
  }

  update(scenes: Scene.IFieldScene): void {
  }

  complete(): void {
    this.isComplete = true;
  }
}
