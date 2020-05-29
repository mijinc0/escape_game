import { IActorSprite } from './IActorSprite';

/**
 * ActorAnimsFactoryはシーンのキャッシュにスプライトシートがある前提でActorの歩行アニメーションを生成する
 * そのため、ActorFactoryで先にスプライトシートをロードしておかないといけない
 */
export interface IActorAnimsFactory {
  /**
   * Actorのアニメーションは歩行グラフィック(1方向4フレーム 計16フレーム)で固定なので、それらを変更する設定はできない
   * setAnimsはシーンのキャッシュにアニメーションがある場合にはそのアニメーション(の参照を取って)使いまわし、
   * キャッシュに存在しない場合は指定のスプライトシートから歩行グラフィックを生成してキャッシュに登録した後、
   * ActorSpriteにアニメーションをセットする
   * 
   * @param targetSprite 歩行アニメーションをセットするスプライトオブジェクト
   * @param spriteKey 歩行アニメーションのセット(更新)に加えてスプライトのテクスチャを指定したい時に使うスプライトシートのキー
   */
  setAnims(targetSprite: IActorSprite, spriteKey?: string): void;
}