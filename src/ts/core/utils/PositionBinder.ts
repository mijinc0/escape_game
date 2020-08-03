export class PositionBinder {
  /**
   * 使う時はemitterの`x`,`y`プロパティのゲッターとセッターを書き換える仕様であることに注意。
   * 
   * @param emitter 
   * @param receiver 
   * @param offsetX 
   * @param offsetY 
   */ 
  static bind(emitter: any, receiver: any, offsetX?: number, offsetY?: number): void {
    const emitterHasPositionProps = ('x' in emitter) && ('y' in emitter);
    const receiverHasPositionProps = ('x' in receiver) && ('y' in receiver);

    if (!emitterHasPositionProps || !receiverHasPositionProps) {
      throw Error(`position properties (x, y) should be in both emitter and receiver`);
    }

    let currentX = emitter['x'];
    let currentY = emitter['y'];

    offsetX = offsetX ? offsetX : 0;
    offsetY = offsetY ? offsetY : 0;

    Object.defineProperty(emitter, 'x', {
      get: () => {
        return currentX;
      },
      set: (v: any) => {
        currentX = v;
        receiver['x'] = currentX + offsetX;
      },
    });

    Object.defineProperty(emitter, 'y', {
      get: () => {
        return currentY;
      },
      set: (v: any) => {
        currentX = v;
        receiver['y'] = currentY + offsetY;
      },
    });
  }
}