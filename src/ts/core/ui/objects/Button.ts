import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { IButtonConfig } from './IButtonConfig';
import { PhaserObjectNodePositionUtil } from '../utils/PhaserObjectNodePositionUtil';
import { UiRenderOrder } from '../../renders/UiRenderOrder';

export class Button extends PhaserObjectNode {
  protected scene: Phaser.Scene;
  protected config: IButtonConfig;
  protected rectangleObject: Phaser.GameObjects.Rectangle;
  protected textObject: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    config: IButtonConfig,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ) {
    super(x, y, width, height);
    
    this.scene = scene;
    this.config = config;
    this.rectangleObject = this._createRectangleObject();
    this.textObject = this._createTextObject();

    this._setTextStyle();
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return [this.rectangleObject, this.textObject];
  }

  private _createRectangleObject(): Phaser.GameObjects.Rectangle {
    if (this.rectangleObject) this.rectangleObject.destroy();

    const rectangle = this.scene.add.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      this.config.backgroundColor ? this.config.backgroundColor : 0x000000,
      this.config.backgroundAlpha ? this.config.backgroundAlpha : 1,
    );
    rectangle.setOrigin(0);
    rectangle.setScrollFactor(1);
    
    UiRenderOrder.base(rectangle);

    return rectangle;
  }

  private _createTextObject(): Phaser.GameObjects.Text {
    if (this.textObject) this.textObject.destroy();

    const text = this.scene.add.text(
      this.x,
      this.y,
      this.config.text,
    );

    UiRenderOrder.base(text);

    return text;
  }

  private _setTextStyle(): void {
    const fontSize = this.config.fontSize ? this.config.fontSize : 20;
    const fontFamily = this.config.fontFamily ? this.config.fontFamily : 'monospace';
    const fontColor = this.config.fontColor ? this.config.fontColor : 'white';

    this.textObject.setFontSize(fontSize);
    this.textObject.setFontFamily(fontFamily);
    this.textObject.setColor(fontColor);
    this.textObject.setAlign('center');
    
    const deltaX = this.width / 2;
    const deltaY = this.height / 2;
    PhaserObjectNodePositionUtil.setDeltaPosition(this.textObject, deltaX, deltaY);

    this.textObject.setOrigin(0.5);
    this.textObject.setPosition(this.x + deltaX, this.y + deltaY);
    this.textObject.setScrollFactor(1);
  }
}