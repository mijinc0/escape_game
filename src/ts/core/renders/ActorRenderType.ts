/**
 * 数字の(通常の)enumだと0の時に条件式でfalseが返って
 * オプショナルなフィールドで使う時に扱いづらいので文字のenumにしている
 * 
 */
export enum ActorRenderType {
  /**
   * スプライトのbottomとdepthを連動させる
   * (bottomのy座標が大きいほど前方に表示される)
   */
  Normal = 'normal',

  /**
   * 全てのActorの下、かつSaticLayerRenderOerder.underActorの上に表示される
   */
  UnderActor = 'underActor',

  /**
   * 全てのActorの上、かつSaticLayerRenderOerder.overActorの下に表示される
   */
  OverActor = 'overActor',
}