import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { IBoxConfig } from './IBoxConfig';
import { UiRenderOrder } from '../../renders/UiRenderOrder';

export class Box extends PhaserObjectNode {
  private scene: Phaser.Scene;
  private config: IBoxConfig;
  private rectangleObject: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    config: IBoxConfig,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ) {
    super(x, y, width, height);
    
    this.scene = scene;
    this.config = config;
    this.rectangleObject = this._createRectangleObject();
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return [this.rectangleObject];
  }

  private _createRectangleObject(): Phaser.GameObjects.Rectangle {
    if (this.rectangleObject) this.rectangleObject.destroy();

    const rectangle = this.scene.add.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      this.config.color,
      this.config.alpha,
    );
    rectangle.setOrigin(0);
    rectangle.setScrollFactor(1);
    
    UiRenderOrder.base(rectangle);

    return rectangle;
  }
}