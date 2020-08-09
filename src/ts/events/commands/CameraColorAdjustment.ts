import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';
import * as Render from '../../core/renders';
import * as Util from '../../core/utils';
import { ColorAdjustmentPipeline } from '../../renders/pipelines/ColorAdjustmentPipeline';

type CameraColorAdjustmentConfig = {
  duration: number,
  colorBalance?: number[],
  saturation?: number,
  lightness?: number,
};

export class CameraColorAdjustment implements Event.IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;
  
  private pipeline: ColorAdjustmentPipeline;
  private duration: number;
  private elasped: number;

  private startColorBalance: number[];
  private startSaturation: number;
  private startLightness: number;
  private targetColorBalance: number[];
  private targetSaturation: number;
  private targetLightness: number;

  constructor(config: CameraColorAdjustmentConfig, async?: boolean) {
    if (config.colorBalance && config.colorBalance.length != 3) {
      throw Error('element size of color balance should be 3.');
    }

    this.pipeline = null;
    this.duration = config.duration;
    this.elasped = 0;

    this.startColorBalance = [0.0, 0.0, 0.0];
    this.startSaturation = 0.0;
    this.startLightness = 0.0;

    this.targetColorBalance = config.colorBalance ? config.colorBalance : [0.0, 0.0, 0.0];
    this.targetSaturation = config.saturation ? config.saturation : 1.0;
    this.targetLightness = config.lightness ? config.lightness : 1.0;
    
    this.isAsync = async ? async : false;
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
    this.elasped = 0;

    const pipeline = Render.ShaderUtil.getRegisterdPipeline(scene.phaserScene.game, 'colorAdjustment');

    if (pipeline instanceof ColorAdjustmentPipeline) {
      this.pipeline = pipeline;

      this.startColorBalance = pipeline.colorBalance;
      this.startSaturation = pipeline.saturation;
      this.startLightness = pipeline.lightness;

      scene.phaserScene.cameras.main.clearRenderToTexture();
      scene.phaserScene.cameras.main.setRenderToTexture(pipeline);
    } else {
      console.warn(`ColorAdjustmentPipeline is not found.`);
      this.complete();
    }
  }

  update(scene: Scene.IFieldScene, time: number, delta: number): void {
    this.elasped += delta;

    const progress = Util.MathUtil.clamp(this.elasped / this.duration, 1, 0);

    this._applyProgress(progress);

    if (progress === 1) {
      this.complete();
    }
  }

  complete(): void {
    this.isComplete = true;
  }

  private _applyProgress(progress: number): void {
    // delta
    const dColorBalance = [
      this.targetColorBalance[0] - this.startColorBalance[0],
      this.targetColorBalance[1] - this.startColorBalance[1],
      this.targetColorBalance[2] - this.startColorBalance[2],
    ]; 
    const dSaturation = this.targetSaturation - this.startSaturation; 
    const dLightness = this.targetLightness - this.startLightness; 

    // current
    const cColorBalance = [
      this.startColorBalance[0] + (dColorBalance[0] * progress),
      this.startColorBalance[1] + (dColorBalance[1] * progress),
      this.startColorBalance[2] + (dColorBalance[2] * progress),
    ];
    const cSaturation = this.startSaturation + (dSaturation * progress); 
    const cLightness = this.startLightness + (dLightness * progress); 

    // set values
    this.pipeline.colorBalance = [
      cColorBalance[0] * progress,
      cColorBalance[1] * progress,
      cColorBalance[2] * progress,
    ];
    this.pipeline.saturation = cSaturation;
    this.pipeline.lightness = cLightness;
  }
}
