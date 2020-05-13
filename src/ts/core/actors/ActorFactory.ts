import * as Phaser from 'phaser';
import { Actor } from './Actor';
import { ActorSprite } from './ActorSprite';

type SpriteConfig = {
  name: string,
  spritesheetPath: string,
  frameWidth: number,
  frameHeight: number,
};

type AnimConfig = {
  key: string,
  startFrame: number,
  endFrame: number,
  frameRate: number,
  repeat: number,
};

type SpriteAnimation = Phaser.Animations.Animation;

export class ActorFactory {
  private scene: Phaser.Scene;
  private id: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.id = 0;
  }

  loadAssets(config: SpriteConfig): void {
    this.scene.load.spritesheet(
      config.name,
      config.spritesheetPath,
      {
        frameWidth: config.frameWidth,
        frameHeight: config.frameHeight,
      },
    );
  }

  create(actorName: string): Actor {
    // 1. create sprite
    const sprite = new ActorSprite(this.scene, 0, 0, actorName);
    
    // 2. create actor
    const actor = new Actor(this.id, actorName, sprite);
    
    // 3. set actor anims
    this._setActorAnims(actor);

    return actor;
  }

  private _setActorAnims(actor: Actor): void {
    const configs = [
      {key: 'walkLeft', startFrame: 0, endFrame: 3, frameRate: 5, repeat: 0},
      {key: 'walkRight', startFrame: 4, endFrame: 7, frameRate: 5, repeat: 0},
      {key: 'walkDown', startFrame: 8, endFrame: 11, frameRate: 5, repeat: 0},
      {key: 'walkUp', startFrame: 12, endFrame: 15, frameRate: 5, repeat: 0},
    ];

    configs.forEach((config: AnimConfig) => {
      // このkeyはシーンのキャッシュに貯められるkey。
      const key = this._createActorAnimKey(actor.name, config.key);
      
      // Actor毎に同じアニメーションを生成すると無駄なので、
      // シーンのキャッシュにあればそれを使う。無ければ生成する。
      const anim = this.scene.anims.get(key) ? this.scene.anims.get(key) : this._createActorAnim(actor.name, config);

      // keyはconfigsのkeyを使う。これは、全てのSpriteに対して同じkeyを使って(それぞれのSpriteに登録された)
      // アニメーションを再生できるようにするため。
      actor.sprite.setAnim(config.key, anim);
    });
  }

  private _createActorAnim(actorName: string, config: AnimConfig): SpriteAnimation {
    const anim = this.scene.anims.create({
      key: this._createActorAnimKey(actorName, config.key),
      frames: this.scene.anims.generateFrameNumbers(actorName, {start: config.startFrame, end: config.endFrame}),
      frameRate: config.frameRate,
      repeat: config.repeat,
    });

    if (!anim) throw Error(`fail to create sprite's animation : ${actorName}_${config.key}`);

    return anim;
  }

  private _createActorAnimKey(actorName: string, key: string): string {
    return `${actorName}_${key}`;
  }
}