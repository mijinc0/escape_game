import * as Phaser from 'phaser';
import { ActorSprite } from './ActorSprite';
import { AssetCacheKey } from '../assets/AssetCacheKey';
import { Direction } from '../models/Direction';

type SpriteAnimation = Phaser.Animations.Animation;

/**
 * 一方向のアニメーショングラフィック(ドアなどの動きのあるオブジェクトなど)用スプライト
 * 一つのspritesheetでアニメーションが完結しているものとする
 * (directionは設定として生きるが、4方向アニメーション用のスプライトと違ってアニメーションに影響を与えない)
 */
export class OneWayAnimActorSprite extends ActorSprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spritesheetKey: string,
    frame?: string | integer,
    direction?: Direction,
  ) {
    super(scene, x, y, spritesheetKey, frame, direction);

    this._initDefaultAnim();
  }

  get spriteKey(): string {
    return this.texture.key;
  }

  set spriteKey(key: string) {
    this.setTexture(key);
    this.clearAnims();
    this._initDefaultAnim();
  }

  private _initDefaultAnim(): void {
    const spritesheetKey = this.texture.key;
    // actorSprite.playAnim('defualt')で再生できる
    const animName = 'default';
    const animKey = this._createActorAnimKey(spritesheetKey, animName);

    const anim = this.scene.anims.get(animKey) ?
      this.scene.anims.get(animKey) :
      this._createDefaultAnim(spritesheetKey, animKey);

    this.setAnim(animName, anim);
  }

  private _createActorAnimKey(spriteSheetKey: string, animName: string): string {
    return AssetCacheKey.anim(spriteSheetKey, animName);
  }

  private _createDefaultAnim(spritesheetKey: string, animKey: string): SpriteAnimation {
    const totalFrames = this.texture.frameTotal - 1;

    const startFrame = 0;
    const endFrame = totalFrames - 1;
    const frameRate = 10;
    const repeat = 0;
    
    const anim = this.scene.anims.create({
      key: animKey,
      frames: this.scene.anims.generateFrameNumbers(spritesheetKey, {start: startFrame, end: endFrame}),
      frameRate: frameRate,
      repeat: repeat,
    });

    if (!anim) throw Error(`fail to create sprite's animation : ${animKey}`);

    return anim;
  }
}