import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

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

    scene.phaserScene.cameras.main.fadeIn(this.duration, 0, 0, 0, (camera: any, progress: number) => {
      if (progress === 1) {
        this.complete();
      }
    });
  }

  update(scene: Scene.IFieldScene): void {}

  complete(): void {
    this.isComplete = true;
  }
}
