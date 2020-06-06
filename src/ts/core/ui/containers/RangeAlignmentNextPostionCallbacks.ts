import { INode } from '../INode';
import { Position } from '../../models/Position';

export class RangeAlignmentNextPostionCallbacks {
  static down(index: number, nodes: INode[], margin: number): Position {
    const previous = nodes[index - 1];
    return {
      x: previous.position.x,
      y: previous.getBottom() + margin,
    };
  }

  static right(index: number, nodes: INode[], margin: number): Position {
    const previous = nodes[index - 1];
    return {
      x: previous.getRight() + margin,
      y: previous.position.y,
    };
  }

  static left(index: number, nodes: INode[], margin: number): Position {
    const current = nodes[index];
    const previous = nodes[index - 1];
    return {
      x: previous.position.x - margin - current.size.width,
      y: previous.position.y,
    };
  }

  static up(index: number, nodes: INode[], margin: number): Position {
    const current = nodes[index];
    const previous = nodes[index - 1];
    return {
      x: previous.position.x,
      y: previous.position.y - margin - current.size.height,
    };
  }
}