import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { ButtonConfig } from './ButtonConfig';
import { UiRenderOrder } from '../../renders/UiRenderOrder';

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
      this.config.backgroundColor ? this.config.backgroundColor : 0x000000,
      this.config.backgroundAlpha ? this.config.backgroundAlpha : 1,
    );
    rectangle.setOrigin(0);

    UiRenderOrder.base(rectangle);

    return rectangle;
  }

  private _createTextObject(): Phaser.GameObjects.Text {
    if (this.textObject) this.textObject.destroy();

    const text = this.scene.add.text(
      this.position.x,
      this.position.y,
      this.config.text,
    );

    UiRenderOrder.base(text);

    return text;
  }

  private _setTextStyle(): void {
    const basePosition = this.scene.cameras.main.worldView;

    const fontSize = this.config.fontSize ? this.config.fontSize : 12;
    const fontFamily = this.config.fontFamily ? this.config.fontFamily : 'monospace';
    const fontColor = this.config.fontColor ? this.config.fontColor : 'white';

    this.textObject.setFontSize(fontSize);
    this.textObject.setFontFamily(fontFamily);
    this.textObject.setColor(fontColor);
    this.textObject.setAlign('center');
    
    const centerX = basePosition.x + this.position.x + (this.size.width / 2);
    const centerY = basePosition.y + this.position.y + (this.size.height / 2);
    this.textObject.setOrigin(0.5);
    this.textObject.setPosition(centerX, centerY);
  }
}