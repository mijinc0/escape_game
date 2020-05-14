import { Node } from '../Node';
import { Direction } from '../Direction';
import { IAlignmentStrategy } from './IAlignmentStrategy';

export class UiContainer extends Node {
  private maxNodes: number;
  private alignmentStrategy: IAlignmentStrategy;

  constructor(
    width: number,
    height: number,
    alignmentStrategy: IAlignmentStrategy,
    x?: number,
    y?: number,
    maxNodes?: number,
  ) {
    super(width, height, x, y);

    this.alignmentStrategy = alignmentStrategy;
    this.maxNodes = maxNodes ? maxNodes : -1;
  }

  pushNode(...node: Node[]): void {
    const childSize = this.children.push(...node);

    // 前を押し出す
    if (this.maxNodes > 0) {
      const pushout = this.children.splice(0, (childSize - this.maxNodes));
      pushout.forEach((node: Node) => {node.destroy()});
    }
    
    this._alignNodes();
  }
  
  unshiftNode(...node: Node[]): void {
    const childSize = this.children.unshift(...node);
    
    // 後ろを押し出す
    const pushout = this.children.splice(this.maxNodes, (childSize - this.maxNodes));
    pushout.forEach((node: Node) => {node.destroy()});

    this._alignNodes();
  }

  getNextNodeIndex(index: number, direction: Direction): number {
    let nextNodeIndex = this.alignmentStrategy.getNextNodeIndex(index, direction);
    
    // 取得したindexが有効なindexでない場合には-1を返す
    if (nextNodeIndex < 0 || nextNodeIndex >= this.children.length) nextNodeIndex = -1;

    return nextNodeIndex;
  }

  /* private */
  private _alignNodes(): void {
    this.alignmentStrategy.align(this);
  }
}