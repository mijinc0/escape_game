import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../../core/events/ScenarioEventUpdateConfig';

export class CameraFadeOut implements IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;
  
  private duration: number;
  private startFadeOut: boolean;

  constructor(duration?: number, async?: boolean, ) {
    this.duration = duration ? duration : 1000;
    this.isAsync = async ? async : false;
    this.isComplete = false; 
    this.startFadeOut = false;
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
    this.startFadeOut = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    if (this.startFadeOut) return;

    if (!config.scene) {
      console.warn('ScenarioEventUpdateConfig has not scene');
      this.isComplete = true;
      return;
    }

    config.scene.cameras.main.fadeOut(this.duration, 0, 0, 0, (camera: any, progress: number) => {
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