import * as Phaser from 'phaser';
import { ActorSprite } from './ActorSprite';
import { AssetCacheKey } from '../assets/AssetCacheKey';
import { Direction } from '../models/Direction';

type SpriteAnimation = Phaser.Animations.Animation;

/**
 * 四方向のアニメーショングラフィック(人物の歩行グラフィックなど)用スプライト
 * spritesheetを四等分し、それぞれLeft,Right,Down,Upとしてアニメーションをセットする
 */
export class FourWayAnimsActorSprite extends ActorSprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spritesheetKey: string,
    frame?: string | integer,
    direction?: Direction,
  ) {
    super(scene, x, y, spritesheetKey, frame, direction);

    this._initDefaultAnims();
  }

  get spriteKey(): string {
    return this.texture.key;
  }

  set spriteKey(key: string) {
    this.setTexture(key);
    this.clearAnims();
    this._initDefaultAnims();
  }

  playAnim(animName: string, ignoreIfPlaying?: boolean): this {
    if (animName === 'default') {
      switch (this.direction) {
        case Direction.Left :
          animName = 'defaultLeft';
          break;

        case Direction.Right :
          animName = 'defaultRight';
          break;

        case Direction.Down :
          animName = 'defaultDown';
          break;

        case Direction.Up :
          animName = 'defaultUp';
          break; 
      }
    }

    return super.playAnim(animName, ignoreIfPlaying);
  }

  private _initDefaultAnims(): void {
    const oneDirectionAnimFrames = this._getOneDirectionAnimFrames();

    // `oneDirectionAnimFrames`が整数でないというのはテクスチャを四等分できなかったことを意味し、
    // さらにこれはテクスチャから四方向のアニメーションを作るのに適さないテクスチャが指定されていることを意味するので非合法
    if (!Number.isInteger(oneDirectionAnimFrames)) {
      throw Error(`total frame size of texture named ${this.spriteKey} is illegal`);
    }

    this._initDefaultAnim('defaultLeft', Direction.Left, oneDirectionAnimFrames);
    this._initDefaultAnim('defaultRight', Direction.Right, oneDirectionAnimFrames);
    this._initDefaultAnim('defaultDown', Direction.Down, oneDirectionAnimFrames);
    this._initDefaultAnim('defaultUp', Direction.Up, oneDirectionAnimFrames);
  }

  private _initDefaultAnim(animName: string, direction: Direction, animFrames: number): void {
    const spritesheetKey = this.texture.key;
    const animKey = this._createActorAnimKey(spritesheetKey, animName);

    const anim = this.scene.anims.get(animKey) ?
      this.scene.anims.get(animKey) :
      this._createDefaultAnim(spritesheetKey, animKey, direction, animFrames);

    this.setAnim(animName, anim);
  }

  private _getOneDirectionAnimFrames(): number {
        // textureは最低一つの"__BASE"フレームを持つ。spritesheetの要素が
    // 16個あれば`texture.frameTotal`は17になる。ここではspritesheetの
    // 要素数が欲しいので-1している
    const totalFrames = this.texture.frameTotal - 1;
    
    // 4方向なので /4
    return totalFrames / 4;
  }

  private _createActorAnimKey(spriteSheetKey: string, animName: string): string {
    return AssetCacheKey.anim(spriteSheetKey, animName);
  }

  private _createDefaultAnim(spritesheetKey: string, animKey: string, direction: Direction, animFrames: number): SpriteAnimation {
    const startFrame = direction * animFrames;
    const endFrame = startFrame + animFrames - 1;
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