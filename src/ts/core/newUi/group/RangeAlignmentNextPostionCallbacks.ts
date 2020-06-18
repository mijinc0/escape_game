import { ITransfrom } from '../ITransfrom';
import { IPosition } from '../IPosition';

/**
 * deltaPositionを取得する
 */
export class RangeAlignmentNextPostionCallbacks {
  static down(current: ITransfrom, anchor: ITransfrom, margin: number): IPosition {
    return {
      x: 0,
      y: anchor.height + margin,
    };
  }

  static up(current: ITransfrom, anchor: ITransfrom, margin: number): IPosition {
    return {
      x: 0,
      y: (current.height + margin) * -1,
    };
  }

  static right(current: ITransfrom, anchor: ITransfrom, margin: number): IPosition {
    return {
      x: anchor.width + margin,
      y: 0,
    };
  }

  static left(current: ITransfrom, anchor: ITransfrom, margin: number): IPosition {
    return {
      x: (current.width + margin) * -1,
      y: 0,
    };
  }
}