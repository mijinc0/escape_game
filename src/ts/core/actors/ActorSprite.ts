import * as Phaser from 'phaser';
import { IActorSprite } from './IActorSprite';

type SpriteAnimation = Phaser.Animations.Animation;

export class ActorSprite extends Phaser.Physics.Arcade.Sprite implements IActorSprite {
  private spriteAnims: Map<string, SpriteAnimation>;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | integer,
  ) {
    super(scene, x, y, texture, frame);

    this.spriteAnims = new Map<string, SpriteAnimation>();
  }

  setAnim(animKey: string, animObject: SpriteAnimation): void {
    this.spriteAnims.set(animKey, animObject);
  }
  
  play(animKey: string, ignoreIfPlaying?: boolean): this {
    const anim = this.spriteAnims.get(animKey);
    
    if (anim) {
      // 自身にキャッシュされていればそのアニメーションを実行する
      this.anims.play(anim, ignoreIfPlaying);
    } else {
      // 自身にキャッシュされていないKeyであれば、グローバルに保管されているアニメーションを探す
      this.play(animKey, ignoreIfPlaying);
    }
    
    return this;
  };

  stop(frame: number): void {
    this.anims.stop();
    this.setFrame(frame);
  }
}