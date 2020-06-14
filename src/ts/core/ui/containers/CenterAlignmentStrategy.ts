import { INode } from '../INode';
import { Direction } from '../Direction';
import { IAlignmentStrategy } from './IAlignmentStrategy';

export class CenterAlignmentStrategy implements IAlignmentStrategy {
  align(parentNode: INode): void {
    const parentCenter = {
      x: parentNode.x + (parentNode.width / 2),
      y: parentNode.y + (parentNode.height / 2),
    };

    parentNode.children.forEach((node: INode) => {
      const childHalfWidth = node.width / 2;
      const childHalfHeight = node.height / 2;

      // 親コンテナの中央に寄せる
      node.x = parentCenter.x - childHalfWidth;
      node.y = parentCenter.y - childHalfHeight;
    });
  }

  /**
   * 使わない予定
   * @param index 
   * @param direction 
   */
  getNextNodeIndex(index: number, direction: Direction): number {
    return index;
  }
}
