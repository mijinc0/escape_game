import { IElement } from '../IElement';
import { IPosition } from '../IPosition';

/**
 * deltaPositionを取得する
 */
export class RangeAlignmentNextPostionCallbacks {
  static down(current: IElement, before: IElement, margin: number, anchor: IElement): IPosition {
    const deltaYFromAnchor = before.y - anchor.y;

    return {
      x: 0,
      y: deltaYFromAnchor + before.height + margin,
    };
  }

  static up(current: IElement, before: IElement, margin: number, anchor: IElement): IPosition {
    const deltaYFromAnchor = before.y - anchor.y;

    return {
      x: 0,
      y: deltaYFromAnchor - (current.height + margin),
    };
  }

  static right(current: IElement, before: IElement, margin: number, anchor: IElement): IPosition {
    const deltaXFromAnchor = before.x - anchor.x;

    return {
      x: deltaXFromAnchor + before.width + margin,
      y: 0,
    };
  }

  static left(current: IElement, before: IElement, margin: number, anchor: IElement): IPosition {
    const deltaXFromAnchor = before.x - anchor.x;

    return {
      x: deltaXFromAnchor - (current.width + margin),
      y: 0,
    };
  }
}
