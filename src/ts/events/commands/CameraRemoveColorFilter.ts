import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';
import * as Render from '../../core/renders';
import { ColorAdjustmentPipeline } from '../../renders/pipelines/ColorAdjustmentPipeline';

export class CameraRemoveColorFilter implements Event.IScenarioEvent {
  readonly isAsync = false;
  
  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    const pipeline = Render.ShaderUtil.getRegisterdPipeline(scene.phaserScene.game, 'colorAdjustment');

    if (pipeline instanceof ColorAdjustmentPipeline) {
      pipeline.colorBalance = [0.0, 0.0, 0.0];
      pipeline.saturation = 1.0;
      pipeline.lightness = 1.0;
    }    

    scene.phaserScene.cameras.main.clearRenderToTexture();
    
    this.complete();
  }

  update(scene: Scene.IFieldScene): void {
  }

  complete(): void {
    this.isComplete = true;
  }
}
