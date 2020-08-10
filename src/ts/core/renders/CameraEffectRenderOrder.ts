import * as Phaser from 'phaser';

/**
 * actor,mapのみに効果を与えたい。
 * staticLayer(tilemap)の上、UIオブジェクトの下にしたいので、
 *
 * 131072 (0x020000) がベース
 *
 */
export class CameraEffectRenderOrder {
  static base(phaserObject: Phaser.GameObjects.Components.Depth, alpha?: number): void {
    alpha = alpha ? alpha : 0;
    phaserObject.depth = 131072 + alpha;
  }
}