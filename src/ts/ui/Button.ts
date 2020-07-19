import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import * as Render from '../core/renders';

type ButtonConfig = {
  scene: Phaser.Scene;
  text: string;
  fontSize?: string;
  fontColor?: string;
  fontFamily?: string;
  backgroundColor?: number;
  backgroundAlpha?: number;
};

export class Button extends Ui.Group {
  constructor(config: ButtonConfig, dx = 0, dy = 0, width = 0, height = 0, anchor?: Ui.IElement) {
    super(dx, dy, width, height, anchor, null);

    this.init(config);
  }

  init(config: ButtonConfig): void {
    const scene = config.scene;

    const bgColor = config.backgroundColor ? config.backgroundColor : 0x000000;
    const bgAlpha = config.backgroundAlpha ? config.backgroundAlpha : 0;
    const baseRectangle = new Ui.Rectangle(scene, 0, 0, this.width, this.height, bgColor, bgAlpha);

    const centerOfBaseRectangleX = baseRectangle.deltaX + baseRectangle.width / 2;
    const centerOfBaseRectangleY = baseRectangle.deltaY + baseRectangle.height / 2;
    const text = new Ui.Text(scene, centerOfBaseRectangleX, centerOfBaseRectangleY, config.text, {
      fontSize: config.fontSize ? config.fontSize : '20px',
      fontFamily: config.fontFamily ? config.fontFamily : 'monospace',
      color: config.fontColor ? config.fontColor : 'white',
    });

    baseRectangle.setOrigin(0);
    text.setOrigin(0.5);

    Render.UiRenderOrder.base(baseRectangle, text);

    scene.add.existing(baseRectangle);
    scene.add.existing(text);

    this.push(baseRectangle, text);
  }
}
