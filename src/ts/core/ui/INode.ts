import { Element } from './Element';
import { Position } from '../models/Position';
import { Size } from '../models/Size';

type SelectNodeEventCallback = (thisNode: INode) => void;

export interface INode extends Element {
  position: Position;

  size: Size;
  
  parent: INode;
  
  children: INode[];

  pushNode(...children: INode[]): number;

  unshiftNode(...children: INode[]): number;

  /**
   * 親のフラグの影響を受けたい場合には第2引数の`recrusive`を使って調べる
   * こうすることで、各ノードのステータスは個別に保存したまま親のフラグの影響を受けることが出来る
   * @param status 
   * @param recrusive 自身の祖先ノードを辿っていずれかのノードのフラグが立っていたら結果をtrueとする 
   */
  hasStatus(status: number, recrusive: boolean): boolean;

  /**
   * 指定したフラグのいずれも持っていない場合にtrue,一つでも持っていればfalse
   * @param status 
   */
  neitherStatus(status: number): boolean;

  setStatus(status: number): void;

  removeStatus(status: number): void;

  update(frame?: number): void;

  emit(event: string, ...args: any[]): boolean;

  on(event: string, listener: (...args: any[]) => void): this;

  setPosition(x: number, y: number): void;

  movePosition(deltaX: number, deltaY: number): void;

  destroy(): null;

  getRight(): number;

  getBottom(): number;

  addSelectEvent(event: SelectNodeEventCallback): void;

  addCancelEvent(event: SelectNodeEventCallback): void;

  select(): void;

  cancel(): void;

  dirty(): void;

  isDirty(): boolean;
}