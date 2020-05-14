import { Node } from '../Node';
import { RangeAlignmentNextPostionCallbacks } from './RangeAlignmentNextPostionCallbacks';
import { RangeAlignmentNextNodeIndexCallbacks } from './RangeAlignmentNextNodeIndexCallbacks';
import { Direction } from '../Direction';
import { IAlignmentStrategy } from './IAlignmentStrategy';
import { Position } from '../../models/Position';

type NextPositionCallback = (index: number, children: Node[], margin: number) => Position;
type NextNodeIndexCallback = (index: number, direction: Direction) => number;

export class RangeAlignmentStrategy implements IAlignmentStrategy {
  // ノード間の間隔(px)
  private margin: number;
  private nextPositionCallback: NextPositionCallback;
  private nextNodeIndexCallback: NextNodeIndexCallback;

  constructor (margin: number, type: Direction) {
    this.margin = margin;

    switch(type) {
      case Direction.Down :
        this.nextPositionCallback = RangeAlignmentNextPostionCallbacks.down;
        this.nextNodeIndexCallback = RangeAlignmentNextNodeIndexCallbacks.down;
        break;

      case Direction.Right :
        this.nextPositionCallback = RangeAlignmentNextPostionCallbacks.right;
        this.nextNodeIndexCallback = RangeAlignmentNextNodeIndexCallbacks.right;
        break;

      case Direction.Left :
        this.nextPositionCallback = RangeAlignmentNextPostionCallbacks.left;
        this.nextNodeIndexCallback = RangeAlignmentNextNodeIndexCallbacks.left;
        break;
      
      case Direction.Up :
        this.nextPositionCallback = RangeAlignmentNextPostionCallbacks.up;
        this.nextNodeIndexCallback = RangeAlignmentNextNodeIndexCallbacks.up;
        break;
    }
  }

  align(parentNode: Node): void {
    parentNode.children.forEach((node: Node, index: number) => {
      const nextPosition = (index === 0) ?
        parentNode.position :
        this.nextPositionCallback(index, parentNode.children, this.margin);

      node.setPosition(nextPosition.x, nextPosition.y);
    });
  }

  // これは public readonly getNextNodeIndex: NextNodeIndexCallback でも良いかも
  getNextNodeIndex(index: number, direction: Direction): number {
    return this.nextNodeIndexCallback(index, direction);
  }
}
