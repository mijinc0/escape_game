import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';

export class CameraFadeIn implements IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;

  private duration: number;
  private startFadeIn: boolean;

  constructor(duration?: number, async?: boolean) {
    this.duration = duration ? duration : 1000;
    this.isAsync = async ? async : false;
    this.isComplete = false;
    this.startFadeIn = false;
  }

  init(scene: IFieldScene): void {
    this.isComplete = false;
    this.startFadeIn = false;
  }

  update(scene: IFieldScene): void {
    if (this.startFadeIn) return;

    scene.phaserScene.cameras.main.fadeIn(
      this.duration,
      0,
      0,
      0,
      (camera: any, progress: number) => {
        if (progress === 1) {
          this.complete();
        }
      },
    );

    this.startFadeIn = true;
  }

  complete(): void {
    this.isComplete = true;
  }
}
