import { INode } from '../INode';
import { Direction } from '../Direction';
import { IAlignmentStrategy } from './IAlignmentStrategy';

export class CenterAlignmentStrategy implements IAlignmentStrategy {
  align(parentNode: INode): void {
    const parentCenter = {
      x: parentNode.position.x + (parentNode.size.width / 2),
      y: parentNode.position.y + (parentNode.size.height / 2),
    };

    parentNode.children.forEach((node: INode) => {
      const childHalfWidth = node.size.width / 2;
      const childHalfHeight = node.size.height / 2;

      node.setPosition(
        parentCenter.x - childHalfWidth,
        parentCenter.y - childHalfHeight,
      );
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
