/**
 * - `key`と`name`の表現について
 *    name : キャッシュに登録される各要素に付けられるユニークな名称、キャッシュに保存される時の名称(Key)とは別
 *    key  : キャッシュに登録されるときのkey、nameとtype(`spriteSheet`など)をもとに生成される
 */
export class AssetCacheKey {
  static spritesheet(name: string): string {
    return this._createKey('spriteSheet', name);
  }

  /**
   * `anim_type_animName` の形でキャッシュに登録される。
   * (e.g.) `anim_spriteSheet_hero_walkDown`(type: `spriteSheet_hero`), `anim_battleEffect_fire (type: battleEffect)`
   *
   * @param type spriteのAnimationの場合はCacheKey.spriteSheetの結果にする
   * @param animName 例えばspriteのAnimationなら`walkDown`など
   */
  static anim(type: string, animName: string): string {
    return this._createKey('anim', type, animName);
  }

  static tilemap(name: string): string {
    return this._createKey('tilemap', name);
  }

  static tileImage(name: string): string {
    return this._createKey('tileImage', name);
  }

  static tileInfo(name: string): string {
    return this._createKey('tileInfo', name);
  }

  static itemIcon(name: string): string {
    return this._createKey('itemIcon', name);
  }

  static audio(name: string): string {
    return this._createKey('audio', name);
  }

  private static _createKey(...words: string[]): string {
    return words.join('_');
  }
}
