import { INode } from '../INode';
import { Direction } from '../Direction';

type CancelContainerEventCallback = (thisContainer: IContainer) => void;

export interface IContainer extends INode {
  maxNodes: number;

  currentIndex: number;

  getCurrent(): INode|null;

  getNext(direction: Direction): INode|null;

  alignNodes(): void;

  addCancelEvent(event: CancelContainerEventCallback): void;

  /**
   * コンテナが選択時にキャンセルアクションされたときのイベント。中身は`addCancelEvent`で登録されたイベントを発火するだけ
   * 
   */
  cancel(): void;
}