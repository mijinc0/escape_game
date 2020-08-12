import * as Actor from '../actors';
import { ActorRenderType } from './ActorRenderType';

/**
 * Actorに与えられるdepthの領域は -1~65535(max:0xffff)
 * 領域が必要なのはspriteのbottomのy座標の利用による遠近を付けるため
 * `-1`があるのは全てのActorの下、かつタイルマップの上に表示するActorのdepthがほしいから
 */
export class ActorRenderOrder {
  static setWithType(sprite: Actor.IActorSprite, type: ActorRenderType): void {
    switch (type) {
      case ActorRenderType.Normal:
        this.prioritizeBottom(sprite);
        break;
      case ActorRenderType.OverActor:
        this.overActor(sprite);
        break;
      case ActorRenderType.UnderActor:
        this.underActor(sprite);
        break;
    }
  }

  /**
   * 下部Y座標が大きい(マップ上で下の位置にいる)オブジェクトが前に表示されるようになる
   * ActorのSpriteの下部y座標とdepthを同じ値になる。これにより、y座標による遠近感が出る
   *
   * @param actor
   */
  static prioritizeBottom(sprite: Actor.IActorSprite): void {
    // 描写順を決めるのはDisplayListであり、これはComponent.Depthのset depthが呼ばれた次のフレームで
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

  /**
   * 使用できる範囲の最小値を使う
   * @param sprite
   */
  static underActor(sprite: Actor.IActorSprite): void {
    sprite.depth = -1;
  }

  /**
   * 使用できる範囲の最大値を使う
   * @param sprite
   */
  static overActor(sprite: Actor.IActorSprite): void {
    sprite.depth = 65535;
  }
}
