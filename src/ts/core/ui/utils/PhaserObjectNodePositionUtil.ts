import * as Phaser from 'phaser';
import { INodePosition } from '../INodePosition';

export class PhaserObjectNodePositionUtil {
  static setDeltaPosition(gameObject: Phaser.GameObjects.GameObject, deltaX: number, deltaY: number): void {
    gameObject.setData('deltaX', deltaX);
    gameObject.setData('deltaY', deltaY);
  }

  static getDeltaPosition(gameObject: Phaser.GameObjects.GameObject): INodePosition {
    const deltaX = gameObject.getData('deltaX');
    const deltaY = gameObject.getData('deltaY');

    return {
      x: typeof(deltaX) === 'number' ? deltaX : 0,
      y: typeof(deltaY) === 'number' ? deltaY : 0,
      isAbsolute: null,
    };
  }
}