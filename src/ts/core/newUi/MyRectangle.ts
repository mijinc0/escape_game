import * as Phaser from 'phaser';
import { Element } from './Element';
import { IElement } from './IElement';
import { MixinUtil } from './utils/MixinUtil';

class MyRectangleBase extends Phaser.GameObjects.Rectangle implements IElement {
  deltaX: number;
  deltaY: number;
  parent: Element;
  children: Element[];

  constructor(scene: Phaser.Scene, x: number, y: number, width?: number, height?: number, fillColor?: number, fillAlpha?: number) {
    super(scene, x, y, width, height, fillColor, fillAlpha);

    this.parent = null;
    this.children = [];
    this.setOrigin(0);
    
  }
}

interface MyRectangleBase extends Phaser.GameObjects.Rectangle, IElement {}

MixinUtil.apply(MyRectangleBase, [Element]);

export const MyRectangle = MyRectangleBase;