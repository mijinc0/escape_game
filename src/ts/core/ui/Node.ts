import { EventEmitter } from 'events';
import { INode } from './INode';
import { NodeStatus } from './NodeStatus';
import { IPosition } from './IPosition';
import { INodePosition } from './INodePosition';
import { ISize } from './ISize';
import { NodeStatusUtil } from './utils/NodeStatusUtil';

type SelectNodeEventCallback = (thisNode: INode) => void;

export class Node extends EventEmitter implements INode {
  readonly customProperties: Map<string, any>;
  
  parent: INode;
  
  children: INode[];
  
  status: number;

  private position: INodePosition;
  private size: ISize;
  private pDirty: boolean;

  constructor(x = 0, y = 0, width = 0, height = 0, absolutePosition = false) {
    super();

    this.position = {x: x, y: y, isAbsolute: absolutePosition};
    this.size = {width: width, height: height};
    this.status = 0;
    this.parent = null;
    this.children = [];
    this.pDirty =false;
    this.customProperties = new Map<string, any>();
  }

  get x(): number {
    return this.position.x;
  }

  set x(x: number) {
    this.position.x = x;
    this.dirty();
  }

  get y(): number {
    return this.position.y;
  }

  set y(y: number) {
    this.position.y = y;
    this.dirty();
  }

  get width(): number {
    return this.size.width;
  }

  set width(width: number) {
    this.size.width = width;
    this.dirty();
  }
  
  get height(): number {
    return this.size.height;
  }

  set height(height: number) {
    this.size.height = height;
    this.dirty();
  }

  get absolutePosition(): boolean {
    return this.position.isAbsolute;
  }

  set absolutePosition(absolutePosition: boolean) {
    this.position.isAbsolute = absolutePosition;
    this.dirty();
  }

  pushNode(...children: INode[]): number {
    this._setAsParent(children);
    return this.children.push(...children);
  }

  unshiftNode(...children: INode[]): number {
    this._setAsParent(children);
    return this.children.unshift(...children);
  }

  update(frame?: number): void {
    this._updateActive();

    this._updateDisable();
  
    this._updateInvisible();
    
    this._updateOn();
    
    this._updateSelect();

    this._updatePosition();

    this.children.forEach((child: INode) => {
      if (child.isDirty()) {
        child.update(frame);
      }
    });

    // 最後に、updateしたらdirtyは消す
    this.pDirty = false;
  }

  destroy(): null {
    // 子ノードもdestroyする
    this.children.forEach((child: INode) => {
      child.destroy();
    });
    
    NodeStatusUtil.setStatus(this, NodeStatus.Destroyed);

    return null;
  }

  removeDestroyedFromTree(): void {
    this.children.forEach((child: INode) => {
      child.removeDestroyedFromTree();
    });

    // Destroyedされた子ノードを削除する
    this.children = this.children.filter((child: INode) => (
      !NodeStatusUtil.hasStatus(child, NodeStatus.Destroyed)
    ));

    // 自身がDestroyedされていたら親ノードも解除する
    if(NodeStatusUtil.hasStatus(this, NodeStatus.Destroyed)) {
      this.parent = null;
    }
  }

  getAbsX(): number {
    const parentX = this.parent ? this.parent.getAbsX() : 0;
    return this.position.isAbsolute ? this.position.x : (this.position.x + parentX);
  };

  getAbsY(): number {
    const parentY = this.parent ? this.parent.getAbsY() : 0;
    return this.position.isAbsolute ? this.position.y : (this.position.y + parentY);
  };

  addSelectEvent(event: SelectNodeEventCallback): void {
    this.on('select', event);
  }

  select(): void {
    this.emit('select', this);
  }

  dirty(childInsulation?: boolean): void {
    this.pDirty = true;

    // 親に向かってグラフを上りながらdirtyを実行していく
    // ただし、childInsulationをtrueにして兄弟ノードへは波及しないようにする
    if (this.parent && !this.parent.isDirty()) this.parent.dirty(true);

    // Insulation(絶縁)の指定がなければ子供に向かってdirtyを実行していく
    if (!childInsulation) {
      this.children.forEach((child: INode) => {
        child.dirty();
      });
    }
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
  
  protected _updatePosition(): void {}

  private _setAsParent(children: INode[]): void {
    children.forEach((child: INode) => {
      if (child.parent) throw Error('chid already has a parent.');
      
      child.parent = this;
    });
  }
}