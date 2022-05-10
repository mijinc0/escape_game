import * as Phaser from 'phaser';

export class ShaderUtil {
  static getRegisterdPipeline(game: Phaser.Game, key: string): Phaser.Renderer.WebGL.WebGLPipeline | null {
    const renderer = game.renderer;

    if (renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      const pipeline = renderer.pipelines.get(key);
      return pipeline ? pipeline : null;
    } else {
      console.warn('Renderer is not WebGLRenderer.');
      return null;
    }
  }
}
