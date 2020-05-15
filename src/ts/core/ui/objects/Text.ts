import * as Phaser from 'phaser';
import { PhaserObjectNode } from './PhaserObjectNode';
import { TextConfig } from './TextConfig';

export class Text extends PhaserObjectNode {
  private scene: Phaser.Scene;
  private config: TextConfig;
  private textObject: Phaser.GameObjects.Text;

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
    
    super.movePosition(deltaX, deltaY);
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return [this.textObject];
  }

  private _createTextObject(): Phaser.GameObjects.Text {
    if (this.textObject) this.textObject.destroy();

    const text = this.scene.add.text(
      this.position.x,
      this.position.y,
      this.config.text,
    );
    text.setOrigin(0);

    return text;
  }

  private _setTextStyle(): void {
    this.textObject.setFontSize(this.config.fontSize);
    this.textObject.setFontFamily(this.config.fontFamily);
    this.textObject.setColor(this.config.color);
    
    if (this.config.isWraped) this.textObject.setWordWrapWidth(this.size.width, true);
    if (this.config.isCramped) this.textObject.setFixedSize(this.size.width, this.size.height);
  }
}