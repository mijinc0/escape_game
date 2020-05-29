import * as Phaser from 'phaser';
import { IActorSprite } from './IActorSprite';
import { SpriteConfig } from './SpriteConfig';
import { ActorSprite } from './ActorSprite';

export class ActorSpriteFactory {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  loadMultipileAssets(configs: SpriteConfig[]): void {
    configs.forEach((config: SpriteConfig) => {
      this.loadAssets(config);
    });
  }

  loadAssets(config: SpriteConfig): void {
    this.scene.load.spritesheet(
      config.key,
      config.spritesheetPath,
      {
        frameWidth: config.frameWidth,
        frameHeight: config.frameHeight,
      },
    );
  }

  create(
    x: number,
    y: number,
    spriteKey: string,
    initFrame = 0,
  ): IActorSprite {
    // 1. create sprite
    const sprite = new ActorSprite(this.scene, x, y, spriteKey, initFrame);
    sprite.setOrigin(0);

    // 2. add sprite into Phaser's scene
    this.scene.add.existing(sprite);
    this.scene.physics.add.existing(sprite);

    return sprite
  }
}