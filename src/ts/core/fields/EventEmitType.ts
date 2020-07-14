export enum EventEmitType {
  /**
   * 主人公が調べるアクションをしてヒットした時のイベント
   */
  Search = 'search',
  
  /**
   * 主人公とActorが衝突した時のイベント
   */
  Collide = 'collide',
  
  /**
   * ActorのStatusPageが切り替わった時(スポーンした時も同様)に直ちに発火するイベント
   */
  Immediately = 'immediately',
}