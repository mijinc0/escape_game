import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { TextConfig } from './TextConfig';
import { UiRenderOrder } from '../../renders/UiRenderOrder';

export class TextBox extends PhaserObjectNode {
  
  protected scene: Phaser.Scene;
  protected config: TextConfig;
  protected textObject: Phaser.GameObjects.Text;
  protected rectangleObject: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Phaser.Scene,
    config: TextConfig,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
  ) {
    super(width, height, x, y);
    
    this.scene = scene;
    this.config = config;
    this.rectangleObject = config.hasBackground ? this._createRectangleObject() : null;
    this.textObject = this._createTextObject();
    this._setTextStyle();
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

  movePosition(deltaX: number, deltaY: number): void {
    this.textObject.setPosition(
      this.textObject.x + deltaX,
      this.textObject.y + deltaY,
    );

    this.rectangleObject.setPosition(
      this.textObject.x + deltaX,
      this.textObject.y + deltaY,
    );
    
    super.movePosition(deltaX, deltaY);
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
    
    UiRenderOrder.base(rectangle);

    return rectangle;
  }

  private _createTextObject(): Phaser.GameObjects.Text {
    const padding = (this.config.hasBackground && this.config.padding) ? this.config.padding : 0;
    const x = this.position.x + padding;
    const y = this.position.y + padding; 

    const text = this.scene.add.text(x, y, this.config.text);
    text.setOrigin(0);
    
    UiRenderOrder.base(text);

    return text;
  }

  private _setTextStyle(): void {
    this.textObject.setFontSize(this.config.fontSize);
    this.textObject.setFontFamily(this.config.fontFamily);
    this.textObject.setColor(this.config.color);
    
    const padding = (this.config.hasBackground && this.config.padding) ? this.config.padding : 0;
    const textWidth = this.size.width - (padding * 2);
    const textHeight = this.size.height - (padding * 2);
    
    if (this.config.align) this.textObject.setAlign(this.config.align);
    if (this.config.isWraped) this.textObject.setWordWrapWidth(textWidth, false);
    if (this.config.isCramped) this.textObject.setFixedSize(textWidth, textHeight);
  }
}