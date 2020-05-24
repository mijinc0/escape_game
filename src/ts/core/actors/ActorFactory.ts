import * as Phaser from 'phaser';
import { Actor } from './Actor';
import { ActorSprite } from './ActorSprite';
import { Direction } from '../models/Direction';

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

type ActorConstructor = new (...args: ConstructorParameters<typeof Actor>) => Actor;

type ActorCreationConfig = {
  name: string,
  eventId: number,
  x: number,
  y: number,
  frame?: number,
  actorConstructor?: ActorConstructor
};

export class ActorFactory {
  private scene: Phaser.Scene;
  private id: number;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.id = 0;
  }

  loadMultipileAssets(configs: SpriteConfig[]): void {
    configs.forEach((config: SpriteConfig) => {
      this.loadAssets(config);
    });
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

  createMultipile(configs: ActorCreationConfig[]): void {
    configs.forEach((config: ActorCreationConfig) => {
      this.create(
        config.name,
        config.eventId,
        config.x,
        config.y,
        config.frame,
        config.actorConstructor
      );
    });
  }

  create(
    actorName: string,
    eventId: number,
    x: number,
    y: number,
    frame = 0,
    actorConstructor: ActorConstructor = Actor
  ): Actor {
    // 1. create sprite
    const sprite = this._crateSprite(actorName, x, y, frame);
    
    // 2. create actor
    const actor = new actorConstructor(this.id, eventId, actorName, sprite, Direction.Left);
    
    // 3. set actor anims
    this._setActorAnims(actor);

    // 4. add actor into scene
    this.scene.add.existing(sprite);
    this.scene.physics.add.existing(sprite);

    // 5. increment id
    this.id++;

    return actor;
  }

  private _crateSprite(
    actorName: string,
    x: number,
    y: number,
    frame: number,
  ): ActorSprite {
    const sprite = new ActorSprite(this.scene, x, y, actorName, frame);
    sprite.setOrigin(0);

    return sprite
  }

  /**
   * Actorのアニメーションは簡単にするために歩行グラフィック4方向(各4フレームずつ)で決め打ち。
   * 必ず "左歩行"　"右歩行" "下歩行" "上歩行" の順に4フレームずつ、計16フレームの素材を用意する(フレームの大きさは指定できる)
   * 
   * それぞれシーンには `_createActorAnimKey()` によって生成されたキーで登録される。
   * 各Actorに直接登録されるアニメーションはシーンのキャッシュにあればそれを取り出して使う。
   * 
   * 各Actorに直接登録されるアニメーションはキャッシュに登録されるものと違ってシンプルなキー(walkLeftなどの)で登録される
   * これにより、キャッシュから呼び出す場合はユニークなキーを取得しないと取得できないのに対し、シンプルなキーを使ってアニメーションを再生できる
   * (
   *    キャッシュから呼び出す場合には 'actorName_animationName' としないといけないのに対し、
   *    各Actorに登録されたアニメーションを再生する時は 'animationName' だけで再生できる
   * )
   * 
   * @param actor 
   */
  private _setActorAnims(actor: Actor): void {
    // アニメーションは歩行グラフィック決め打ち
    const configs = [
      {key: 'walkLeft', startFrame: 0, endFrame: 3, frameRate: 5, repeat: 0},
      {key: 'walkRight', startFrame: 4, endFrame: 7, frameRate: 5, repeat: 0},
      {key: 'walkDown', startFrame: 8, endFrame: 11, frameRate: 5, repeat: 0},
      {key: 'walkUp', startFrame: 12, endFrame: 15, frameRate: 5, repeat: 0},
    ];

    configs.forEach((config: AnimConfig) => {
      // このkeyはシーンのキャッシュに貯められるkey。
      const key = this._createActorAnimKey(actor.name, config.key);
      
      // 同じSpriteのActor毎に同じアニメーションを生成すると無駄なので、
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