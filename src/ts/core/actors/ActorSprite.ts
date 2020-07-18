import * as Phaser from 'phaser';
import * as Model from '../models';
import { IActorSprite } from './IActorSprite';

type SpriteAnimation = Phaser.Animations.Animation;

export class ActorSprite extends Phaser.Physics.Arcade.Sprite
  implements IActorSprite {
  direction: Model.Direction;

  private spriteAnims: Map<string | number, SpriteAnimation>;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spriteKey: string,
    frame?: string | number,
    direction?: Model.Direction,
  ) {
    super(scene, x, y, spriteKey, frame);

    this.direction = direction ? direction : Model.Direction.Down;
    this.spriteAnims = new Map<string, SpriteAnimation>();
    this.setOrigin(0);
  }

  get spriteKey(): string {
    return this.texture.key;
  }

  set spriteKey(key: string) {
    this.setTexture(key);
  }

  setAnim(animName: string | number, animObject: SpriteAnimation): void {
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
  }

  stopAnim(): this {
    if (this.anims.isPlaying) {
      this.anims.stop();
    }

    return this;
  }

  clearAnims(animName?: string): void {
    if (animName) {
      this.spriteAnims.delete(animName);
    } else {
      this.spriteAnims.clear();
    }
  }

  pause(): void {
    if (this.body) {
      this.setData('saveVelocityX', this.body.velocity.x);
      this.setData('saveVelocityY', this.body.velocity.y);
      this.body.stop();
    }

    if (this.anims.currentAnim) {
      this.anims.currentAnim.pause();
    }
  }

  resume(): void {
    const savedVelocityX = this.getData('saveVelocityX');
    const savedVelocityY = this.getData('saveVelocityY');
    const velocityX = typeof savedVelocityX === 'number' ? savedVelocityX : 0;
    const velocityY = typeof savedVelocityY === 'number' ? savedVelocityY : 0;
    this.setVelocity(velocityX, velocityY);
    this.data.remove(['saveVelocityX', 'saveVelocityY']);

    if (this.anims.currentAnim) {
      this.anims.currentAnim.resume();
    }
  }
}
