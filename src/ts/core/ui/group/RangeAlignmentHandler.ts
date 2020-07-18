import * as Model from '../../models';
import { IElement } from '../IElement';
import { RangeAlignmentNextPostionCallbacks } from './RangeAlignmentNextPostionCallbacks';
import { RangeAlignmentNextIndexCallbacks } from './RangeAlignmentNextIndexCallbacks';
import { Direction } from '../Direction';
import { IAlignmentHandler } from './IAlignmentHandler';

type NextPositionCallback = (
  current: IElement,
  before: IElement,
  margin: number,
  anchor: IElement,
) => Model.Position;
type NextIndexCallback = (index: number, direction: Direction) => number;

export class RangeAlignmentHandler implements IAlignmentHandler {
  // ノード間の間隔(px)
  private margin: number;
  private nextPositionCallback: NextPositionCallback;
  private nextIndexCallback: NextIndexCallback;

  constructor(margin: number, type: Direction) {
    this.margin = margin;

    switch (type) {
      case Direction.Down:
        this.nextPositionCallback = RangeAlignmentNextPostionCallbacks.down;
        this.nextIndexCallback = RangeAlignmentNextIndexCallbacks.down;
        break;

      case Direction.Right:
        this.nextPositionCallback = RangeAlignmentNextPostionCallbacks.right;
        this.nextIndexCallback = RangeAlignmentNextIndexCallbacks.right;
        break;

      case Direction.Left:
        this.nextPositionCallback = RangeAlignmentNextPostionCallbacks.left;
        this.nextIndexCallback = RangeAlignmentNextIndexCallbacks.left;
        break;

      case Direction.Up:
        this.nextPositionCallback = RangeAlignmentNextPostionCallbacks.up;
        this.nextIndexCallback = RangeAlignmentNextIndexCallbacks.up;
        break;
    }
  }

  align(transformObjects: IElement[], anchor: IElement): void {
    transformObjects.forEach((transformObject: IElement, index: number) => {
      const beforeObject = index === 0 ? anchor : transformObjects[index - 1];

      const nextDeltaPosition =
        index === 0
          ? { x: 0, y: 0 }
          : this.nextPositionCallback(
              transformObject,
              beforeObject,
              this.margin,
              anchor,
            );

      transformObject.anchor = anchor;
      transformObject.deltaX = nextDeltaPosition.x;
      transformObject.deltaY = nextDeltaPosition.y;
    });
  }

  getNextIndex(currentIndex: number, direction: Direction): number {
    return this.nextIndexCallback(currentIndex, direction);
  }
}
