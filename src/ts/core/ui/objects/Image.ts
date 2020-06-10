import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { IImageConfig } from './IImageConfig';
import { UiRenderOrder } from '../../renders/UiRenderOrder';

export class Image extends PhaserObjectNode {
  private scene: Phaser.Scene;
  private config: IImageConfig;
  private imageObject: Phaser.GameObjects.Image;

  constructor(
    scene: Phaser.Scene,
    config: IImageConfig,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
  ) {
    super(width, height, x, y);
    
    this.scene = scene;
    this.config = config;
    this.imageObject = this._createImageObject();
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return [this.imageObject];
  }

  private _createImageObject(): Phaser.GameObjects.Image {
    if (this.imageObject) this.imageObject.destroy();

    const basePosition = this.scene.cameras.main.worldView;

    const image = this.scene.add.image(
      basePosition.x + this.position.x,
      basePosition.y + this.position.y,
      this.config.key,
      this.config.frame,
    );
    image.setOrigin(0);
    
    UiRenderOrder.base(image);

    return image;
  }
}