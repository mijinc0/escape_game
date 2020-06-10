import { Element } from './Element';
import { Position } from '../models/Position';
import { Size } from '../models/Size';

type SelectNodeEventCallback = (thisNode: INode) => void;

export interface INode extends Element {
  position: Position;
  
  size: Size;
  
  parent: INode;
  
  children: INode[];
  
  customProperties: Map<string, any>;

  /**
   * ステータスは`enum NodeStatus`参照
   */
  status: number;

  pushNode(...children: INode[]): number;

  unshiftNode(...children: INode[]): number;

  update(frame?: number): void;

  emit(event: string, ...args: any[]): boolean;

  on(event: string, listener: (...args: any[]) => void): this;

  setPosition(x: number, y: number): void;

  movePosition(deltaX: number, deltaY: number): void;

  destroy(): null;

  /**
   * Destroyedフラグが立っているノードをツリーから削除する
   * この関数は再帰するので、ルートノードで実行する
   */
  removeDestroyedFromTree(): void;

  getRight(): number;

  getBottom(): number;
  
  addSelectEvent(event: SelectNodeEventCallback): void;
  
  addCancelEvent(event: SelectNodeEventCallback): void;

  /**
   * ノードが選択時に決定アクションされたときのイベント。中身は`addSelectEvent`で登録されたイベントを発火するだけ
   * 
   */
  select(): void;

  /**
   * ノードが選択時にキャンセルアクションされたときのイベント。中身は`addCancelEvent`で登録されたイベントを発火するだけ
   * 
   */
  cancel(): void;

  /**
   * 変化の検知はdirty checkで行う
   * 1. 親ノードも再帰的にdirtyを実行していく
   * 2. 子ノードは`childInsulation`が`true`でなければ子ノードもdirtyを実行していく
   * 上記により、変更があったノードの子孫ノードと、先祖ノードのみにdirtyフラグを立てることが出来る
   * 
   * @param childInsulation trueであれば子ノードは再帰的にdirtyを実行しない(子ノードは絶縁する)
   */
  dirty(childInsulation?: boolean): void;

  /**
   * このノードのdirtyフラグが立っているかどうか
   */
  isDirty(): boolean;
}