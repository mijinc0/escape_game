import { INode } from '../INode';
import { IPosition } from '../IPosition';

export class RangeAlignmentNextPostionCallbacks {
  static down(index: number, nodes: INode[], margin: number): IPosition {
    const previous = nodes[index - 1];
    return {
      x: previous.x,
      y: previous.x + previous.height + margin,
    };
  }

  static right(index: number, nodes: INode[], margin: number): IPosition {
    const previous = nodes[index - 1];
    return {
      x: previous.x + previous.width + margin,
      y: previous.y,
    };
  }

  static left(index: number, nodes: INode[], margin: number): IPosition {
    const current = nodes[index];
    const previous = nodes[index - 1];
    return {
      x: previous.x - margin - current.width,
      y: previous.y,
    };
  }

  static up(index: number, nodes: INode[], margin: number): IPosition {
    const current = nodes[index];
    const previous = nodes[index - 1];
    return {
      x: previous.x,
      y: previous.y - margin - current.height,
    };
  }
}