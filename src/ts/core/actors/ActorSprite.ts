import * as Phaser from 'phaser';
import { IActorSprite } from './IActorSprite';
import { Direction } from '../models/Direction';

type SpriteAnimation = Phaser.Animations.Animation;

export class ActorSprite extends Phaser.Physics.Arcade.Sprite implements IActorSprite {
  direction: Direction;
  
  private spriteAnims: Map<string|number, SpriteAnimation>;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spriteKey: string,
    frame?: string|number,
    direction?: Direction,
  ) {
    super(scene, x, y, spriteKey, frame);
    
    this.direction = direction ? direction : Direction.Down;
    this.spriteAnims = new Map<string, SpriteAnimation>();
    this.setOrigin(0);
  }

  get spriteKey(): string {
    return this.texture.key;
  }

  set spriteKey(key: string) {
    this.setTexture(key);
  }

  setAnim(animName: string|number, animObject: SpriteAnimation): void {
    this.spriteAnims.set(animName, animObject);
  }
  
  playAnim(
    animName: string,
    ignoreIfPlaying?: boolean,
    onCompleteEventCallback?: () => void,
  ): this {
    const anim = this.spriteAnims.get(animName);
    
    if (anim) {
      // onCompleteコールバックがある場合はセットしておく(一度限りなのでonceで)
      if (onCompleteEventCallback) {
        anim.once('complete', onCompleteEventCallback);
      }

      // 自身にキャッシュされていればそのアニメーションを実行する
      this.anims.play(anim, ignoreIfPlaying);
      
    } else {
      // 自身にキャッシュされていないnameであれば、グローバルに保管されているアニメーションを探す
      // この時、`animName`を`animKey`としてアニメーションを探す
      this.anims.play(animName, ignoreIfPlaying);
    }
    
    return this;
  };

  clearAnims(animName?: string): void {
    if (animName) {
      this.spriteAnims.delete(animName);
    } else {
      this.spriteAnims.clear();
    }
  }

  stop(frame: number): void {
    this.anims.stop();
    this.setFrame(frame);
  }
}