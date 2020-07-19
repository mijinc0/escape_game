import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';

export class CameraFadeOut implements IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;

  private duration: number;
  private startFadeOut: boolean;

  constructor(duration?: number, async?: boolean) {
    this.duration = duration ? duration : 1000;
    this.isAsync = async ? async : false;
    this.isComplete = false;
    this.startFadeOut = false;
  }

  init(scene: IFieldScene): void {
    this.isComplete = false;
    this.startFadeOut = false;
  }

  update(scene: IFieldScene): void {
    if (this.startFadeOut) return;

    scene.phaserScene.cameras.main.fadeOut(this.duration, 0, 0, 0, (camera: any, progress: number) => {
      if (progress === 1) {
        this.complete();
      }
    });

    this.startFadeOut = true;
  }

  complete(): void {
    this.isComplete = true;
  }
}
