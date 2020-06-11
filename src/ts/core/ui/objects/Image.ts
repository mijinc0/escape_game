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
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ) {
    super(x, y, width, height);
    
    this.scene = scene;
    this.config = config;
    this.imageObject = this._createImageObject();
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return [this.imageObject];
  }

  private _createImageObject(): Phaser.GameObjects.Image {
    if (this.imageObject) this.imageObject.destroy();

    const image = this.scene.add.image(
      this.position.x,
      this.position.y,
      this.config.key,
      this.config.frame,
    );
    image.setOrigin(0);
    image.setScrollFactor(1);
    
    UiRenderOrder.base(image);

    return image;
  }
}