import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { ButtonConfig } from './ButtonConfig';

export class Button extends PhaserObjectNode {
  private scene: Phaser.Scene;
  private config: ButtonConfig;
  private rectangleObject: Phaser.GameObjects.Rectangle;
  private textObject: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    config: ButtonConfig,
    width: number,
    height: number,
    x?: number,
    y?: number,
  ) {
    super(width, height, x, y);
    
    this.scene = scene;
    this.config = config;
    this.rectangleObject = this._createRectangleObject();
    this.textObject = this._createTextObject();

    this._setTextStyle();
  }

  movePosition(deltaX: number, deltaY: number): void {
    this.rectangleObject.setPosition(
      this.rectangleObject.x + deltaX,
      this.rectangleObject.y + deltaY,
    );

    this.textObject.setPosition(
      this.textObject.x + deltaX,
      this.textObject.y + deltaY,
    );
    
    super.movePosition(deltaX, deltaY);
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return [this.rectangleObject, this.textObject];
  }

  private _createRectangleObject(): Phaser.GameObjects.Rectangle {
    if (this.rectangleObject) this.rectangleObject.destroy();

    const rectangle = this.scene.add.rectangle(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
      this.config.backgroundColor,
      this.config.backgroundAlpha,
    );
    rectangle.setOrigin(0);

    return rectangle;
  }

  private _createTextObject(): Phaser.GameObjects.Text {
    if (this.textObject) this.textObject.destroy();

    const text = this.scene.add.text(
      this.position.x,
      this.position.y,
      this.config.text,
    );

    return text;
  }

  private _setTextStyle(): void {
    this.textObject.setFontSize(this.config.fontSize);
    this.textObject.setFontFamily(this.config.fontFamily);
    this.textObject.setColor(this.config.fontColor);
    this.textObject.setAlign('center');
    
    const centerX = this.position.x + (this.size.width / 2);
    const centerY = this.position.y + (this.size.height / 2);
    this.textObject.setOrigin(0.5);
    this.textObject.setPosition(centerX, centerY);
  }
}