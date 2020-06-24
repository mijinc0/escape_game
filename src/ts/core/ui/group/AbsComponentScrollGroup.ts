import { ScrollGroup } from './ScrollGroup';
import { IAlignmentHandler } from './IAlignmentHandler';
import { IElement } from '../IElement';

/**
 * 型引数Tの型の引数を元に複数のElementから成るグループ(UIの部品)を作る時に使う
 * 型引数TIは、`protected abstract init(initArg: TI): void;`で使われる
 */
export abstract class AbsComponentScrollGroup<TI, TD> extends ScrollGroup<TD> {
  constructor(initArg: TI, dx = 0, dy = 0, width = 0, height = 0, anchor?: IElement, ah?: IAlignmentHandler, maxSize?: number) {
    super(dx, dy, width, height, anchor, ah, maxSize);

    this.init(initArg);
  }

  /**
   * 継承したクラスはここでインスタンスの初期化を行う
   */
  protected abstract init(initArg: TI): void;
}