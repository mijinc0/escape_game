import * as Phaser from 'phaser';
import { IActorAnimsFactory } from './IActorAnimsFactory';
import { IActorSprite } from './IActorSprite';

type AnimConfig = {
  key: string,
  startFrame: number,
  endFrame: number,
  frameRate: number,
  repeat: number,
};

type SpriteAnimation = Phaser.Animations.Animation;

/**
 * ActorAnimsFactoryはシーンのキャッシュにスプライトシートがある前提でActorの歩行アニメーションを生成する
 * そのため、ActorFactoryで先にスプライトシートをロードしておかないといけない
 */
export class ActorAnimsFactory implements IActorAnimsFactory {
  /**
   * Actorのアニメーションは簡単にするために歩行グラフィック4方向(各4フレームずつ)で決め打ち。
   * 必ず "左歩行"　"右歩行" "下歩行" "上歩行" の順に4フレームずつ、計16フレームの素材を用意する(フレームの大きさは指定できる)
   * 
   * それぞれシーンには `_createActorAnimKey()` によって生成されたキーで登録される。
   * 各Actorに直接登録されるアニメーションはシーンのキャッシュにあればそれを取り出して使う。
   */
  static acotrAnims = [
    {key: 'walkLeft', startFrame: 0, endFrame: 3, frameRate: 5, repeat: 0},
    {key: 'walkRight', startFrame: 4, endFrame: 7, frameRate: 5, repeat: 0},
    {key: 'walkDown', startFrame: 8, endFrame: 11, frameRate: 5, repeat: 0},
    {key: 'walkUp', startFrame: 12, endFrame: 15, frameRate: 5, repeat: 0},
  ];

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  setAnims(targetSprite: IActorSprite, spriteKey?: string): void {
    if (spriteKey) {
      targetSprite.spriteKey = spriteKey;
    } else { 
      spriteKey = targetSprite.spriteKey;
    }

    ActorAnimsFactory.acotrAnims.forEach((config: AnimConfig) => {
      // このkeyはシーンのキャッシュに貯められるkey
      const key = this._createActorAnimKey(spriteKey, config.key);
      
      // 同じSpriteのActor毎に同じアニメーションを生成すると無駄なので、
      // シーンのキャッシュにあればそれを使う。無ければ生成する
      const anim = this.scene.anims.get(key) ? this.scene.anims.get(key) : this._createActorAnim(spriteKey, config);

      // keyはconfigsのkeyを使う。これは、全てのSpriteに対して同じkeyを使って(それぞれのSpriteに登録された)
      // アニメーションを再生できるようにするため
      targetSprite.setAnim(config.key, anim);
    });
  }

  /** 
   * 各Actorに直接登録されるアニメーションはキャッシュに登録されるものと違ってシンプルなキー(walkLeftなどの)で登録される
   * これにより、キャッシュから呼び出す場合はユニークなキーを取得しないと取得できないのに対し、シンプルなキーを使ってアニメーションを再生できる
   * (
   *    キャッシュから呼び出す場合には 'actorName_animationName' としないといけないのに対し、
   *    各Actorに登録されたアニメーションを再生する時は 'animationName' だけで再生できる
   * )
   * 
   * @param spriteKey 
   * @param config 
   */
  private _createActorAnim(spriteKey: string, config: AnimConfig): SpriteAnimation {
    const animKey = this._createActorAnimKey(spriteKey, config.key);

    // ここはPhaserのanim
    const anim = this.scene.anims.create({
      key: animKey,
      frames: this.scene.anims.generateFrameNumbers(spriteKey, {start: config.startFrame, end: config.endFrame}),
      frameRate: config.frameRate,
      repeat: config.repeat,
    });

    if (!anim) throw Error(`fail to create sprite's animation : ${spriteKey}_${config.key}`);

    return anim;
  }

  private _createActorAnimKey(spriteKey: string, key: string): string {
    return `${spriteKey}_${key}`;
  }
}