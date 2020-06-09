import * as Phaser from 'phaser';
import { IActorSprite } from './IActorSprite';

type SpriteAnimation = Phaser.Animations.Animation;

export class ActorSprite extends Phaser.Physics.Arcade.Sprite implements IActorSprite {
  private spriteAnims: Map<string, SpriteAnimation>;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spriteKey: string,
    frame?: string | integer,
  ) {
    super(scene, x, y, spriteKey, frame);

    this.spriteKey = spriteKey;
    this.spriteAnims = new Map<string, SpriteAnimation>();
  }

  get spriteKey(): string {
    return this.texture.key;
  }

  set spriteKey(key: string) {
    this.setTexture(key);
  }

  setAnim(animName: string, animObject: SpriteAnimation): void {
    this.spriteAnims.set(animName, animObject);
  }
  
  play(animName: string, ignoreIfPlaying?: boolean): this {
    const anim = this.spriteAnims.get(animName);
    
    if (anim) {
      // 自身にキャッシュされていればそのアニメーションを実行する
      this.anims.play(anim, ignoreIfPlaying);
    } else {
      // 自身にキャッシュされていないnameであれば、グローバルに保管されているアニメーションを探す
      // この時、`animName`を`animKey`としてアニメーションを探す
      this.anims.play(animName, ignoreIfPlaying);
    }
    
    return this;
  };

  stop(frame: number): void {
    this.anims.stop();
    this.setFrame(frame);
  }
}