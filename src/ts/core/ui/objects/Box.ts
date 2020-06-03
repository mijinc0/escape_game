import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { BoxConfig } from './BoxConfig';
import { UiRenderOrder } from '../../renders/UiRenderOrder';

export class Box extends PhaserObjectNode {
  private scene: Phaser.Scene;
  private config: BoxConfig;
  private rectangleObject: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    config: BoxConfig,
    width: number,
    height: number,
    x?: number,
    y?: number,
  ) {
    super(width, height, x, y);
    
    this.scene = scene;
    this.config = config;
    this.rectangleObject = this._createRectangleObject();
  }

  movePosition(deltaX: number, deltaY: number): void {
    this.rectangleObject.setPosition(
      this.rectangleObject.x + deltaX,
      this.rectangleObject.y + deltaY,
    );
    
    super.movePosition(deltaX, deltaY);
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return [this.rectangleObject];
  }

  private _createRectangleObject(): Phaser.GameObjects.Rectangle {
    if (this.rectangleObject) this.rectangleObject.destroy();

    const basePosition = this.scene.cameras.main.worldView;

    const rectangle = this.scene.add.rectangle(
      basePosition.x + this.position.x,
      basePosition.y + this.position.y,
      this.size.width,
      this.size.height,
      this.config.color,
      this.config.alpha,
    );
    rectangle.setOrigin(0);
    
    UiRenderOrder.base(rectangle);

    return rectangle;
  }
}