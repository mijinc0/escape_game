import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';
import * as Camera from '../../core/cameras';

/**
 * cameraEffectManagerのfade effectを使う。
 * map,actorsはエフェクトの影響を受けるが、UIは影響を受けない
 */
export class CameraFadeIn implements Event.IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;

  private duration: number;

  constructor(duration?: number, async?: boolean) {
    this.duration = duration ? duration : 1000;
    this.isAsync = async ? async : false;
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    if (scene.cameraEffectManager instanceof Camera.DefaultCameraEffectManager) {
      scene.cameraEffectManager.fadeIn(this.duration, this.complete.bind(this));
    } else {
      console.warn('cameraEffectManager is not DefaultCameraEffectManager');
      this.complete();
    }
  }

  update(scene: Scene.IFieldScene): void {
  }

  complete(): void {
    this.isComplete = true;
  }
}
