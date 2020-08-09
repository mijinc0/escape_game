import * as Phaser from 'phaser';
import { CustomPipeline } from './pipelines/CustomPipeline';
import { CustomPipelines } from './pipelines/CustomPipelines';

export class GameShadersRegistrar {
  static regist(game: Phaser.Game): boolean {
    const renderer = game.renderer;

    if (renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      const pipelines = CustomPipelines(game);
      this._registShaders(renderer, pipelines);
      return true;

    } else {
      console.warn('game.renderer is not Phaser.Renderer.WebGL.WebGLRenderer. shaders will not be used.');
      return false;
    } 
  }

  private static _registShaders(renderer: Phaser.Renderer.WebGL.WebGLRenderer, pipelines: CustomPipeline[]): void {
    pipelines.forEach((pipeline: CustomPipeline) => {
      console.log(`regist custom shader {name: ${pipeline.name}}`);

      renderer.addPipeline(pipeline.name, pipeline);
    });
  }
}