import * as Phaser from 'phaser';
import * as Util from '../utils';
import { IActorSpriteFactory } from './IActorSpriteFactory';
import { IBodyConfig } from './IBodyConfig';
import { ActorSprite } from './ActorSprite';
import { OneWayAnimActorSprite } from './OneWayAnimActorSprite';
import { FourWayAnimsActorSprite } from './FourWayAnimsActorSprite';

export class ActorSpriteFactory implements IActorSpriteFactory {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createOneWayAnimActorSprite(
    x: number,
    y: number,
    spritesheetKey?: string,
    initFrame?: number,
    bodyConfig?: IBodyConfig,
  ): OneWayAnimActorSprite {
    this._checkExistingSpritesheet(spritesheetKey);

    const sprite = new OneWayAnimActorSprite(this.scene, x, y, spritesheetKey, initFrame);
    sprite.setOrigin(0);

    this._addPhaserScene(sprite);
    this.bodySetting(sprite, bodyConfig);

    return sprite;
  }

  createFourWayAnimsActorSprite(
    x: number,
    y: number,
    spritesheetKey?: string,
    initFrame?: number,
    bodyConfig?: IBodyConfig,
  ): FourWayAnimsActorSprite {
    this._checkExistingSpritesheet(spritesheetKey);

    const sprite = new FourWayAnimsActorSprite(this.scene, x, y, spritesheetKey, initFrame);
    sprite.setOrigin(0);

    this._addPhaserScene(sprite);
    this.bodySetting(sprite, bodyConfig);

    return sprite;
  }

  createInvisibleActorSprite(x: number, y: number, bodyConfig?: IBodyConfig): ActorSprite {
    const sprite = new ActorSprite(this.scene, x, y, 'invisible', 0);
    sprite.setOrigin(0);
    sprite.visible = false;

    this._addPhaserScene(sprite);
    this.bodySetting(sprite, bodyConfig);

    return sprite;
  }

  bodySetting(sprite: ActorSprite, bodyConfig?: IBodyConfig): void {
    if (!bodyConfig) return;

    if (bodyConfig.size) {
      // bodyConfig.sizeがnumberであればスプライトの大きさに対して何割かで決める
      // bodyConfig.sizeがSizeであれば指定の大きさをbodyの大きさとする
      Util.ValueTypeUtil.isNumber(bodyConfig.size)
        ? sprite.body.setSize(sprite.width * bodyConfig.size, sprite.height * bodyConfig.size)
        : sprite.body.setSize(bodyConfig.size.width, bodyConfig.size.width);
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
      sprite.body.setOffset(offset.x + bodyConfig.offset.x, offset.y + bodyConfig.offset.y);
    }
  }

  private _addPhaserScene(sprite: ActorSprite): void {
    this.scene.add.existing(sprite);
    this.scene.physics.add.existing(sprite);
  }

  private _checkExistingSpritesheet(spritesheetKey: string): void {
    if (!this.scene.textures.exists(spritesheetKey)) {
      console.warn(`${spritesheetKey} is not found in txture cache.`);
    }
  }
}
