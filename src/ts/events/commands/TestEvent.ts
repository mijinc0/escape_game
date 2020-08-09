import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';
import * as Asset from '../../core/assets';
import * as Render from '../../core/renders';
import { ColorAdjustmentPipeline } from '../../renders/pipelines/ColorAdjustmentPipeline';

/**
 * 色々試す時に使うイベント(本編では不要)
 */
export class TestEvent implements Event.IScenarioEvent {
  readonly isAsync: boolean;

  isComplete: boolean;

  private duration: number;
  private elapsed: number;
  private pipeline: ColorAdjustmentPipeline;

  constructor(duration: number, isAsync?: boolean) {
    this.duration = duration;
    this.isAsync = isAsync ? isAsync : false;
    this.elapsed = 0;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
    this.elapsed = 0;

    const pipeline = Render.ShaderUtil.getRegisterdPipeline(scene.phaserScene.game, 'colorAdjustment');

    if (pipeline instanceof ColorAdjustmentPipeline) {
      this.pipeline = pipeline;

      this.pipeline.colorBalance = [0, 0, 0];

      scene.phaserScene.cameras.main.clearRenderToTexture();
      scene.phaserScene.cameras.main.setRenderToTexture('colorAdjustment');
    } else {
      console.warn('WebGLPipeline named colorAdjustment is not found.');
      this.complete();
    }
  }

  update(scenes: Scene.IFieldScene, time: number, delta: number): void {
    if (this.isComplete) return;

    this.elapsed += delta;

    const current = this.pipeline.colorBalance[0];
    const next = current + 0.05;

    this.pipeline.colorBalance = [next, 0, 0];

    if (this.elapsed > 1000) {
      this.complete();
    }
  }

  complete(): void {
    this.isComplete = true;
  }
}
