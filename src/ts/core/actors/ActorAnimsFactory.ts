import * as Phaser from 'phaser';
import { IActorAnimsFactory } from './IActorAnimsFactory';
import { IActorSprite } from './IActorSprite';
import { CacheKey } from '../utils/CacheKey';

type AnimConfig = {
  name: string,
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
    {name: 'walkLeft', startFrame: 0, endFrame: 3, frameRate: 10, repeat: 0},
    {name: 'walkRight', startFrame: 4, endFrame: 7, frameRate: 10, repeat: 0},
    {name: 'walkDown', startFrame: 8, endFrame: 11, frameRate: 10, repeat: 0},
    {name: 'walkUp', startFrame: 12, endFrame: 15, frameRate: 10, repeat: 0},
  ];

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  setAnims(targetSprite: IActorSprite, spriteSheetKey?: string): void {
    if (spriteSheetKey) {
      // 指定がある場合は、targetSpriteのspriteSheetKeyを変更する(指定のsheetに変える)
      targetSprite.spriteKey = spriteSheetKey;
    } else {
      // spriteSheetKeyの指定が無い場合はtargetSpriteのspriteSheetKeyをそのまま使う 
      spriteSheetKey = targetSprite.spriteKey;
    }

    ActorAnimsFactory.acotrAnims.forEach((config: AnimConfig) => {
      // このkeyはシーンのキャッシュに貯められるkey
    const animKey = this._createActorAnimKey(spriteSheetKey, config.name);
      
      // 同じSpriteのActor毎に同じアニメーションを生成すると無駄なので、
      // シーンのキャッシュにあればそれを使う。無ければ生成する
      const anim = this.scene.anims.get(animKey) ? this.scene.anims.get(animKey) : this._createActorAnim(spriteSheetKey, config);

      // keyはconfigsのkeyを使う。これは、全てのSpriteに対して同じkeyを使って(それぞれのSpriteに登録された)
      // アニメーションを再生できるようにするため
      targetSprite.setAnim(config.name, anim);
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
   * @param spriteSheetKey
   * @param config 
   */
  private _createActorAnim(spriteSheetKey: string, config: AnimConfig): SpriteAnimation {
    const animKey = this._createActorAnimKey(spriteSheetKey, config.name);
    
    // ここはPhaserのanim
    const anim = this.scene.anims.create({
      key: animKey,
      frames: this.scene.anims.generateFrameNumbers(spriteSheetKey, {start: config.startFrame, end: config.endFrame}),
      frameRate: config.frameRate,
      repeat: config.repeat,
    });

    if (!anim) throw Error(`fail to create sprite's animation : ${animKey}`);

    return anim;
  }

  private _createActorAnimKey(spriteSheetKey: string, animName: string): string {
    return CacheKey.anim(spriteSheetKey, animName);
  }
}