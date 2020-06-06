import { Node } from '../Node';
import { INode } from '../INode';
import { Direction } from '../Direction';
import { IAlignmentStrategy } from './IAlignmentStrategy';

export class Container extends Node {
  protected maxNodes: number;
  
  private alignmentStrategy: IAlignmentStrategy;

  constructor(
    alignmentStrategy: IAlignmentStrategy,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    maxNodes?: number,
  ) {
    super(width, height, x, y);

    this.alignmentStrategy = alignmentStrategy;
    this.maxNodes = maxNodes ? maxNodes : -1;
  }

  pushNode(...node: INode[]): number {
    const childSize = super.pushNode(...node);

    // 前を押し出す
    if (this.maxNodes > 0) {
      const pushout = this.children.splice(0, (childSize - this.maxNodes));
      pushout.forEach((node: INode) => {node.destroy()});
    }
    
    this._alignNodes();

    return this.children.length;
  }
  
  unshiftNode(...node: INode[]): number {
    const childSize = super.unshiftNode(...node);
    
    // 後ろを押し出す
    const pushout = this.children.splice(this.maxNodes, (childSize - this.maxNodes));
    pushout.forEach((node: INode) => {node.destroy()});

    this._alignNodes();

    return this.children.length;
  }

  get(index: number): INode|null {
    return this.children[index] ? this.children[index] : null;
  }

  getNext(index: number, direction: Direction): INode|null {
    const nextIndex = this.getNextIndex(index, direction);

    return this.get(nextIndex);
  }

  /**
   * 
   * @param index 
   * @param direction 
   * @param limit trueならalignmentStrategyから取得した値がchildrenの範囲から出ていた時は-1を返す(リミットを設ける)
   */
  getNextIndex(index: number, direction: Direction, limit = true): number {
    let nextNodeIndex = this.alignmentStrategy.getNextNodeIndex(index, direction);
    
    const overLimit = (nextNodeIndex < 0 || nextNodeIndex >= this.children.length);
    
    // limitが設定されており、かつ取得したindexがchildrenに対して有効なindexでない(limitを超えている)場合には-1を返す
    return (limit || overLimit) ? -1 : nextNodeIndex;
  }

  private _alignNodes(): void {
    this.alignmentStrategy.align(this);
  }
}