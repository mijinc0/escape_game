import { INode } from '../INode';
import { Direction } from '../Direction';

type CancelContainerEventCallback = (thisContainer: IContainer) => void;

export interface IContainer extends INode {
  maxNodes: number;

  currentIndex: number;

  getCurrent(): INode|null;

  /**
   * currentIndexが指すノードに対する次のノードを取得する
   * - 内部でcurrentIndexが進む
   * - 次のノードが無い場合は現在のノードが返ってくる
   * @param direction 
   */
  getNext(direction: Direction): INode;

  alignNodes(): void;

  addCancelEvent(event: CancelContainerEventCallback): void;

  /**
   * コンテナが選択時にキャンセルアクションされたときのイベント。中身は`addCancelEvent`で登録されたイベントを発火するだけ
   * 
   */
  cancel(): void;
}