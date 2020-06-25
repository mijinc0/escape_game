import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { IItemDescription } from './IItemDescription';

type ItemDescriptionConfig = {
  scene: Phaser.Scene,
  defaultText?: string,
  backgroundColor?: number,
  backgroundAlpha?: number,
};

export class ItemDescription extends Ui.Group implements IItemDescription {
  readonly defaultText: string;

  private textObject: Ui.Text;

  get text(): string {
    return this.textObject.text;
  }

  set text(text: string) {
    this.textObject.text = text;
  }

  constructor(config: ItemDescriptionConfig, dx = 0, dy = 0, anchor?: Ui.IElement) {
    const width = 320;
    const height = 240;
    super(dx, dy, width, height, anchor);

    this.alignmentHandler = null;
    this.entries = [];
    this.currentIndex = -1;
    this.defaultText = config.defaultText ? config.defaultText : '';

    this._init(config);
  }

  private _init(config: ItemDescriptionConfig): void {
    const scene = config.scene;

    const bgColor = config.backgroundColor ? config.backgroundColor : 0x000000;
    const bgAlpha = config.backgroundAlpha ? config.backgroundAlpha : 0.8;
    const baseRectangle = new Ui.Rectangle(scene, 0, 0, this.width, this.height, bgColor, bgAlpha);
    baseRectangle.setOrigin(0);

    const textMargin = 16;
    this.textObject = new Ui.Text(scene, textMargin, textMargin, this.defaultText, {},);
    this.textObject.setOrigin(0);
    this.textObject.setWordWrapWidth(this.width - (textMargin * 2), true);

    scene.add.existing(baseRectangle);
    scene.add.existing(this.textObject);
    
    this.push(baseRectangle, this.textObject);
  }
}