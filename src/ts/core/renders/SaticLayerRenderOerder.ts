import * as Phaser from 'phaser';

type StaticLayer = Phaser.Tilemaps.StaticTilemapLayer;

/**
 * Actorがy座標によって(0~65535)変化するものとしてマップのレイヤーdepthを決める
 *
 * baseLayer : -2
 * underActor : -1
 * overActor: 65536 (0x01000)
 *
 */
export class SaticLayerRenderOerder {
  static baseLayer(staticLayer: StaticLayer): void {
    staticLayer.depth = -2;
  }

  static underActorLayer(staticLayer: StaticLayer): void {
    staticLayer.depth = -1;
  }

  static overActorLayer(staticLayer: StaticLayer): void {
    staticLayer.depth = 65536;
  }
}
