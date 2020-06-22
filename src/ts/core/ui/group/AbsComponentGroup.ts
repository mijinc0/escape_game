import { Group } from './Group';
import { IAlignmentStrategy } from './IAlignmentStrategy';
import { IElement } from '../IElement';

/**
 * 型引数Tの型の引数を元に複数のElementから成るグループ(UIの部品)を作る時に使う
 * 型引数Tは、`protected abstract init(initArg: T): void;`で使われる
 */
export abstract class AbsComponentGroup<T> extends Group {
  constructor(initArg: T, dx = 0, dy = 0, width = 0, height = 0, anchor?: IElement, as?: IAlignmentStrategy) {
    super(dx, dy, width, height, anchor, as);

    this.init(initArg);
  }

  /**
   * 継承したクラスはここでインスタンスの初期化を行う
   */
  protected abstract init(initArg: T): void;
}