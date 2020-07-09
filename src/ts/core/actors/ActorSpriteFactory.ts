import * as Phaser from 'phaser';
import { IActorSprite } from './IActorSprite';
import { IBodyConfig } from './IBodyConfig';
import { ActorSprite } from './ActorSprite';
import { ValueTypeUtil } from '../utils/ValueTypeUtil';

export class ActorSpriteFactory {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(
    x: number,
    y: number,
    spriteKey: string,
    initFrame = 0,
    bodyConfig?: IBodyConfig,
  ): IActorSprite {
    if (!this.scene.textures.exists(spriteKey)) {
      console.warn(`${spriteKey} is not found in txture cache.`);
    }

    // 1. create sprite
    const sprite = new ActorSprite(this.scene, x, y, spriteKey, initFrame);
    sprite.setOrigin(0);
    
    // 2. add sprite into Phaser's scene
    this.scene.add.existing(sprite);
    this.scene.physics.add.existing(sprite);

    // 3. body setting
    this.bodySetting(sprite, bodyConfig);

    return sprite
  }

  bodySetting(sprite: ActorSprite, bodyConfig?: IBodyConfig): void {
    if (!bodyConfig) return;

    if (bodyConfig.size) {
      // bodyConfig.sizeがnumberであればスプライトの大きさに対して何割かで決める
      // bodyConfig.sizeがSizeであれば指定の大きさをbodyの大きさとする
      (ValueTypeUtil.isNumber(bodyConfig.size)) ?
        sprite.body.setSize((sprite.width * bodyConfig.size), (sprite.height * bodyConfig.size)) :
        sprite.body.setSize(bodyConfig.size.width, bodyConfig.size.width);
    }

    if (bodyConfig.origin) {
      const originX = Math.max(0, Math.min(1, bodyConfig.origin.x));
      const originY = Math.max(0, Math.min(1, bodyConfig.origin.y));
      const originOffsetX = (sprite.width - sprite.body.width) * originX;
      const originOffsetY = (sprite.height - sprite.body.height) * originY;
      sprite.body.setOffset(originOffsetX, originOffsetY);
    }

    if (bodyConfig.offset) {
      const offset = sprite.body.offset;
      sprite.body.setOffset(
        offset.x + bodyConfig.offset.x,
        offset.y + bodyConfig.offset.y,
      );
    }
  }
}