import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { ITextConfig } from './ITextConfig';
import { UiRenderOrder } from '../../renders/UiRenderOrder';

export class TextBox extends PhaserObjectNode {
  
  protected scene: Phaser.Scene;
  protected config: ITextConfig;
  protected textObject: Phaser.GameObjects.Text;
  protected rectangleObject: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    config: ITextConfig,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ) {
    super(x, y, width, height);
    
    this.scene = scene;
    this.config = config;
    this.rectangleObject = config.hasBackground ? this._createRectangleObject() : null;
    this.textObject = this._createTextObject();
  }

  get text(): string {
    return this.textObject.text;
  }

  setText(text: string): void {
    this.textObject.text = text;
  }

  addText(text: string): void {
    this.textObject.text += text;
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return this.rectangleObject ?
      [this.textObject, this.rectangleObject] :
      [this.textObject];
  }

  private _createRectangleObject(): Phaser.GameObjects.Rectangle {
    const rectangle = this.scene.add.rectangle(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
      this.config.backgroundColor ? this.config.backgroundColor : 0x000000,
      this.config.backgroundAlpha ? this.config.backgroundAlpha : 1,
    );
    rectangle.setOrigin(0);
    rectangle.setScrollFactor(1);
    
    UiRenderOrder.base(rectangle);

    return rectangle;
  }

  private _createTextObject(): Phaser.GameObjects.Text {
    const padding = this.config.padding ? this.config.padding : 0;
    const x = this.position.x + padding;
    const y = this.position.y + padding; 

    const text = this.scene.add.text(x, y, this.config.text);
    text.setOrigin(0);
    text.setScrollFactor(1);

    this._setTextStyle(text);
  
    UiRenderOrder.base(text);

    return text;
  }

  private _setTextStyle(textObject: Phaser.GameObjects.Text): void {
    const fontSize = this.config.fontSize ? this.config.fontSize : 12;
    const fontFamily = this.config.fontFamily ? this.config.fontFamily : 'monospace';
    const fontColor = this.config.color ? this.config.color : 'white';

    textObject.setFontSize(fontSize);
    textObject.setFontFamily(fontFamily);
    textObject.setColor(fontColor);
    
    const padding = this.config.padding ? this.config.padding : 0;
    const textWidth = this.size.width - (padding * 2);
    const textHeight = this.size.height - (padding * 2);
    
    if (this.config.align) textObject.setAlign(this.config.align);
    if (this.config.isWraped) textObject.setWordWrapWidth(textWidth, false);
    if (this.config.isCramped) textObject.setFixedSize(textWidth, textHeight);
  }
}