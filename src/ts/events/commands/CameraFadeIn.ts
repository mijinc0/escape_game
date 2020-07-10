import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../../core/events/ScenarioEventUpdateConfig';

export class CameraFadeIn implements IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;
  
  private duration: number;
  private startFadeIn: boolean;

  constructor(duration?: number, async?: boolean, ) {
    this.duration = duration ? duration : 1000;
    this.isAsync = async ? async : false;
    this.isComplete = false; 
    this.startFadeIn = false;
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
    this.startFadeIn = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    if (this.startFadeIn) return;

    if (!config.scene) {
      console.warn('ScenarioEventUpdateConfig has not scene');
      this.isComplete = true;
      return;
    }

    config.scene.cameras.main.fadeIn(this.duration, 0, 0, 0, (camera: any, progress: number) => {
      if (progress === 1) {
        this.complete();
      }
    });

    this.startFadeIn = true;
  }

  complete(): void {
    this.isComplete = true;
  }
}