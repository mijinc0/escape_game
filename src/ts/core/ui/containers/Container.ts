import { IContainer } from './IContainer';
import { Node } from '../Node';
import { INode } from '../INode';
import { Direction } from '../Direction';
import { IAlignmentStrategy } from './IAlignmentStrategy';

type CancelContainerEventCallback = (thisContainer: IContainer) => void;

export class Container extends Node implements IContainer {
  maxNodes: number;
  currentIndex: number;
  
  private alignmentStrategy: IAlignmentStrategy;

  constructor(
    alignmentStrategy: IAlignmentStrategy,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    maxNodes?: number,
  ) {
    super(x, y, width, height);

    this.currentIndex = -1;
    this.maxNodes = maxNodes ? maxNodes : -1;
    this.alignmentStrategy = alignmentStrategy;
  }

  pushNode(...node: INode[]): number {
    const childSize = super.pushNode(...node);

    // 前を押し出す
    if (this.maxNodes > 0) {
      const pushout = this.children.splice(0, (childSize - this.maxNodes));
      pushout.forEach((node: INode) => {node.destroy()});
    }
    
    this.alignNodes();

    return this.children.length;
  }
  
  unshiftNode(...node: INode[]): number {
    super.unshiftNode(...node);
    
    // 後ろを押し出す
    if (this.maxNodes > 0) {
      const pushout = this.children.splice(this.maxNodes);
      pushout.forEach((node: INode) => {node.destroy()});
    }

    this.alignNodes();

    return this.children.length;
  }

  getCurrent(): INode|null {
    return this._get(this.currentIndex);
  }

  getNext(direction: Direction): INode|null {
    const nextIndex = this._getNextIndex(direction);
    const nextNode = this._get(nextIndex);

    if (!nextNode) return null;

    this.currentIndex = nextIndex;
    
    return nextNode;
  }

  alignNodes(): void {
    this.alignmentStrategy.align(this);
  }

  addCancelEvent(event: CancelContainerEventCallback): void {
    this.on('cancel', event);
  }

  cancel(): void {
    this.emit('cancel', this);
  }

  protected _get(index: number): INode|null {
    return this.children[index] ? this.children[index] : null;
  }

  /**
   * 
   * @param index 
   * @param direction 
   * @param limit trueならalignmentStrategyから取得した値がchildrenの範囲から出ていた時は-1を返す(リミットを設ける)
   */
  protected _getNextIndex(direction: Direction, limit = true): number {
    const currentIndex = this.currentIndex;

    if (currentIndex < 0) return 0;

    const nextNodeIndex = this.alignmentStrategy.getNextNodeIndex(currentIndex, direction);
    
    const overLimit = (nextNodeIndex < 0 || nextNodeIndex >= this.children.length);
    // limitが設定されており、かつ取得したindexがchildrenに対して有効なindexでない(limitを超えている)場合にはcurrentIndexを返す
    return (limit && overLimit) ? this.currentIndex : nextNodeIndex;
  }
}