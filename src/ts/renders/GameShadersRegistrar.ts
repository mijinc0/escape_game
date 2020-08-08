import * as Phaser from 'phaser';
import { GameShaders } from './GameShaders';

export class GameShadersRegistrar {
  static regist(game: Phaser.Game): boolean {
    const renderer = game.renderer;

    if (renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      this._registGameShaders(renderer);
      return true;

    } else {
      console.warn('game.renderer is not Phaser.Renderer.WebGL.WebGLRenderer. shaders will not be used.');
      return false;
    } 
  }

  private static _registGameShaders(renderer: Phaser.Renderer.WebGL.WebGLRenderer): void {
    GameShaders.forEach((fragShader: string, key: string) => {
      this._registPipeline(renderer, key, fragShader);
    });
  }

  private static _registPipeline(renderer: Phaser.Renderer.WebGL.WebGLRenderer, key: string, fragShader: string): void {
    const config = {
      game: renderer.game,
      renderer: renderer,
      fragShader: fragShader,
    };

    const pipelineInstance = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline(config);

    console.log(`regist renderer pipeline (shader) : ${key}`);

    renderer.addPipeline(key, pipelineInstance);
  }
}