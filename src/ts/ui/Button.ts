import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import { UiRenderOrder } from '../core/renders/UiRenderOrder';

type ButtonConfig = {
  scene: Phaser.Scene,
  text: string,
  fontSize?: string,
  fontColor?: string,
  fontFamilly?: string,
  backgroundColor?: number,
  backgroundAlpha?: number,
};

export class Button extends Ui.AbsComponentGroup<ButtonConfig> {
  init(config: ButtonConfig): void {
    // あると邪魔になるので設定されていたら消しておく
    this.alignmentHandler = null;

    const scene = config.scene;

    const bgColor = config.backgroundColor ? config.backgroundColor : 0x000000;
    const bgAlpha = config.backgroundAlpha ? config.backgroundAlpha : 0.8;
    const baseRectangle = new Ui.Rectangle(scene, 0, 0, this.width, this.height, bgColor, bgAlpha);

    const centerOfBaseRectangleX = baseRectangle.deltaX + (baseRectangle.width / 2);
    const centerOfBaseRectangleY = baseRectangle.deltaY +(baseRectangle.height / 2);
    const text = new Ui.Text(
      scene,
      centerOfBaseRectangleX,
      centerOfBaseRectangleY,
      config.text,
      {
        fontSize: config.fontSize ? config.fontSize : '20px',
        fontFamily: config.fontFamilly ? config.fontFamilly : 'monospace',
        color: config.fontColor ? config.fontColor : 'white',
      },
    );

    baseRectangle.setOrigin(0);
    text.setOrigin(0.5);

    UiRenderOrder.base(baseRectangle, text);

    scene.add.existing(baseRectangle);
    scene.add.existing(text);
  
    this.push(baseRectangle, text);
  }
}