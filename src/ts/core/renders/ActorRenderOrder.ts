import { IActorSprite } from '../actors/IActorSprite';

export class ActorRenderOrder {
  /**
   * Y座標が大きい(マップ上で下の位置にいる)オブジェクトが前に表示されるようになる
   * ActorのSpriteのY座標とdepthを同じ値になる。
   * 
   * @param actor 
   */
  static prioritizeY(sprite: IActorSprite): void {
    // 同じ値にするには、yのセッターを置き換える

    Object.defineProperty(sprite, '_y', {
      value: sprite.y,
      writable: true,
    });

    Object.defineProperty(sprite, 'y', {
      get: () => {
        return (<any>sprite)._y;
      },

      set: (newY: number) => {
        (<any>sprite)._y = newY;
        sprite.depth = newY;
      },
    });
  }
}