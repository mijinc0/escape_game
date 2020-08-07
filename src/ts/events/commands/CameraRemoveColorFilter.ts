import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

export class CameraRemoveColorFilter implements Event.IScenarioEvent {
  readonly isAsync = false;
  
  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    scene.phaserScene.cameras.main.clearTint();
    
    this.complete();
  }

  update(scene: Scene.IFieldScene): void {
  }

  complete(): void {
    this.isComplete = true;
  }
}
