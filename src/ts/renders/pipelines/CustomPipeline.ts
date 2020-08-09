import * as Phaser from 'phaser';

export class CustomPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
  readonly name: string;

  constructor(game: Phaser.Game, name: string, fragShader: string) {
    super({
      game: game,
      renderer: game.renderer,
      fragShader: fragShader,
    });

    this.name = name;
  }
}