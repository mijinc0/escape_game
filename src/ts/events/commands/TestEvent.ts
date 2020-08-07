import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';
import * as Asset from '../../core/assets';
import { GameShaders } from '../../shaders/GameShaders';

/**
 * 色々試す時に使うイベント(本編では不要)
 */
export class TestEvent implements Event.IScenarioEvent {
  readonly isAsync: boolean;

  isComplete: boolean;

  constructor(isAsync?: boolean) {
    this.isAsync = isAsync ? isAsync : false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    const config = {
      game: scene.phaserScene.game,
      renderer: scene.phaserScene.game.renderer,
      fragShader: GameShaders.test,  // GLSL shader
    };

    const pipelineInstance = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline(config);

    scene.phaserScene.cameras.main.setRenderToTexture(pipelineInstance);

    this.isComplete = true;
  }

  update(scenes: Scene.IFieldScene): void {
  }

  complete(): void {
    this.isComplete = true;
  }
}
