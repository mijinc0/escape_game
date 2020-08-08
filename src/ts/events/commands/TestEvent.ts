import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';
import * as Asset from '../../core/assets';
import * as Render from '../../core/renders';
import { GameShaders } from '../../renders/GameShaders';

/**
 * 色々試す時に使うイベント(本編では不要)
 */
export class TestEvent implements Event.IScenarioEvent {
  readonly isAsync: boolean;

  isComplete: boolean;

  private pipeline: Phaser.Renderer.WebGL.WebGLPipeline;

  constructor(isAsync?: boolean) {
    this.isAsync = isAsync ? isAsync : false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    this.pipeline = Render.ShaderUtil.getRegisterdPipeline(scene.phaserScene.game, 'test');

    if (this.pipeline) {
      scene.phaserScene.cameras.main.setRenderToTexture(this.pipeline);
      this.complete();
      
    } else {
      this.complete();
    }
  }

  update(scenes: Scene.IFieldScene): void {
  }

  complete(): void {
    this.isComplete = true;
  }
}
