import * as Phaser from 'phaser';

/**
 * ActorとStaticLayerの上に置きたいので以下の値を割り振る
 * 
 * 1048576 (0x100000) 
 */
export class UiRenderOrder {
  static base(...gameObject: Phaser.GameObjects.Components.Depth[]): void {
    gameObject.forEach((obj: Phaser.GameObjects.Components.Depth) => {
      obj.depth = 1048576;
    });
  }

  static selectorCursor(gameObject: Phaser.GameObjects.Components.Depth): void {
    gameObject.depth = 1048576 + 1;
  }
}