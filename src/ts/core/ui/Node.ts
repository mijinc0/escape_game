import { EventEmitter } from 'events';
import { INode } from './INode';
import { BitflagHelper } from './utils/BitflagHelper';
import { Position } from '../models/Position';
import { Size } from '../models/Size';

type SelectNodeEventCallback = (thisNode: INode) => void;

export class Node extends EventEmitter implements INode {
  position: Position;

  size: Size;
  
  parent: INode;
  
  children: INode[];
  
  private status: number;
  
  private pDirty: boolean;

  constructor(
    width?: number,
    height?: number,
    x?: number,
    y?: number,
  ) {
    super();

    this.position = {
      x: x ? x : 0,
      y: y ? y : 0,
    };

    this.size = {
      width: width ? width : 0,
      height: height ? height : 0,
    };
    
    this.status = 0;
    this.parent = null;
    this.children = [];
    this.pDirty =false;
  }

  pushNode(...children: INode[]): number {
    this._setAsParent(children);
    return this.children.push(...children);
  }

  unshiftNode(...children: INode[]): number {
    this._setAsParent(children);
    return this.children.unshift(...children);
  }

  /**
   * 親のフラグの影響を受けたい場合には第2引数の`recrusive`を使って調べる
   * こうすることで、各ノードのステータスは個別に保存したまま親のフラグの影響を受けることが出来る
   * @param status 
   * @param recrusive 自身の祖先ノードを辿っていずれかのノードのフラグが立っていたら結果をtrueとする 
   */
  hasStatus(status: number, recrusive = false): boolean {
    let result = BitflagHelper.has(this.status, status);

    if (recrusive) {
      const parents = this.parent ? this.parent.hasStatus(status, true) : false;
      result = result || parents;
    }

    return result;
  }

  /**
   * 指定したフラグのいずれも持っていない場合にtrue,一つでも持っていればfalse
   * @param status 
   */
  neitherStatus(status: number): boolean {
    // 反転したステータスの対象のフラグが全て立っていれば全て持っていないことになる
    return BitflagHelper.has(~this.status, status);
  }

  setStatus(status: number): void {
    // 全てのフラグをすでに所持している場合には何もしない
    if (this.hasStatus(status)) return;

    // フラグをセットして、状態が変わったのでdirty
    this.status |= status;
    this.dirty();
  }

  removeStatus(status: number): void {
    // 全てのフラグを最初から持っていない場合には何もしない
    if (this.neitherStatus(status)) return;
    
    // フラグをおろして、状態が変わったのでdirty
    this.status &= ~status;
    this.dirty();
  }

  update(frame?: number): void {
    this._updateActive();

    this._updateDisable();
  
    this._updateInvisible();
    
    this._updateOn();
    
    this._updateSelect();

    this.children.forEach((child: INode) => {
      child.update(frame);
    });

    // 最後に、updateしたらdirtyは消す
    this.pDirty = false;
  }

  setPosition(x: number, y: number): void {
    const deltaX = x - this.position.x;
    const deltaY = y - this.position.y;
    this.movePosition(deltaX, deltaY);
  }

  movePosition(deltaX: number, deltaY: number): void {
    this.position.x += deltaX;
    this.position.y += deltaY;

    this.children.forEach((child: INode) => {
      child.movePosition(deltaX, deltaY);
    }); 
  }

  destroy(): null {
    this.children.forEach((child: INode) => {
      child.destroy();
    });

    return null;
  }

  getRight(): number {
    return this.position.x + this.size.width;
  }

  getBottom(): number {
    return this.position.y + this.size.height;
  }

  addSelectEvent(event: SelectNodeEventCallback): void {
    this.on('select', event);
  }

  addCancelEvent(event: SelectNodeEventCallback): void {
    this.on('cancel', event);
  }

  select(): void {
    this.emit('select', this);
  }

  cancel(): void {
    this.emit('cancel', this);
  }

  dirty(): void {
    this.pDirty = true;

    // 親に向かってグラフを上りながらdirtyを実行していく
    if (this.parent && !this.parent.isDirty()) this.parent.dirty();

    // 子供に向かってdirtyを実行していく
    this.children.forEach((child: INode) => {
      child.dirty();
    });
  }

  isDirty(): boolean {
    return this.pDirty;
  }

  protected _updateActive(): void {}

  protected _updateDisable(): void {}

  /**
   * Invisibleはこのクラス自体はレンダリング対象となるオブジェクトを持たないので、
   * このクラスを継承したクラスで指示を出す。その際、"親が消えた時に子も消える"状況を
   * 作るなら、子にInvisibleフラグを伝染させるのではなく、
   * this.hasStatus(NodeStatus.Invisible, true)
   * を使って自身の祖先ノードにInvisibleを持ったノードがあるかどうかを調べることで表示を決める。
   */
  protected _updateInvisible(): void {}

  protected _updateOn(): void {}
  
  protected _updateSelect(): void {}

  /* private */
  private _setAsParent(children: INode[]): void {
    children.forEach((child: INode) => {
      if (child.parent) throw Error('chid already has a parent.');
      
      child.parent = this;
    });
  }
}