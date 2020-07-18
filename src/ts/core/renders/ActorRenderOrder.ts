import * as Actor from '../actors';

export class ActorRenderOrder {
  /**
   * 下部Y座標が大きい(マップ上で下の位置にいる)オブジェクトが前に表示されるようになる
   * ActorのSpriteの下部y座標とdepthを同じ値になる。これにより、y座標による遠近感が出る
   *
   * @param actor
   */
  static prioritizeBottom(sprite: Actor.IActorSprite): void {
    // 描写順を決めるのはDisplayListであり、これはComponent.Depthのset depthが呼ばれた時に
    // ソートされるようになっている。この仕様により、yとdepthを同じ値にするには、yのセッターを置き換えるのが良い
    // (yが変更されたらdepthが書き換わるようにする)

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

        const bottom = newY + sprite.height;
        sprite.depth = bottom;
      },
    });
  }
}
