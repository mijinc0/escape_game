import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

export class CameraAddColorFilter implements Event.IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;

  private color: number;
  private alpha: number;
  private duration: number;

  constructor(color: number, alpha: number, duration?: number, async?: boolean) {
    this.color = color;
    this.alpha = alpha;
    this.duration = duration ? duration : 1000;
    this.isAsync = async ? async : false;
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    scene.cameraEffectManager.startEffect(
      'filter',
      {
        duration: this.duration,
        endAlpha: this.alpha,
        endColor: this.color,
        onComplete: this.complete.bind(this),
      },
    );
  }

  update(scene: Scene.IFieldScene): void {
  }

  complete(): void {
    this.isComplete = true;
  }
}
