import { EventEmitter } from 'events';
import { Element } from './Element';
import { BitflagHelper } from './utils/BitflagHelper';
import { Position } from '../models/Position';
import { Size } from '../models/Size';

type SelectNodeEventCallback = (thisNode: Node) => void;

export class Node extends EventEmitter implements Element {
  position: Position;

  size: Size;
  
  parent: Node;
  
  children: Node[];
  
  private status: number;
  
  private pDirty: boolean;

  constructor(
    width = 0,
    height = 0,
    x = 0,
    y = 0,
  ) {
    super();

    this.position = {x: x, y: y};
    this.size = {width: width, height: height};
    this.status = 0;
    this.parent = null;
    this.children = [];
    this.pDirty =false;
  }

  pushNode(...children: Node[]): void {
    this._setAsParent(children);
    this.children.push(...children);
  }

  unshiftNode(...children: Node[]): void {
    this._setAsParent(children);
    this.children.unshift(...children);
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
   
    this._updateInvisible();

    this.children.forEach((child: Node) => {
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

    this.children.forEach((child: Node) => {
      child.movePosition(deltaX, deltaY);
    }); 
  }

  destroy(): null {
    this.children.forEach((child: Node) => {
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

  select(): void {
    this.emit('select', this);
  }

  dirty(): void {
    this.pDirty = true;

    // 親に向かってグラフを上りながらdirtyを実行していく
    if (this.parent && !this.parent.isDirty()) this.parent.dirty();

    // 子供に向かってdirtyを実行していく
    this.children.forEach((child: Node) => {
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
  private _setAsParent(children: Node[]): void {
    children.forEach((child: Node) => {
      if (child.parent) throw Error('chid already has a parent.');
      
      child.parent = this;
    });
  }
}