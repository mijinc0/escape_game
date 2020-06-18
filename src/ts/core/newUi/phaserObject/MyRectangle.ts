import * as Phaser from 'phaser';
import { Element } from '../Element';
import { IElement } from '../IElement';
import { MixinUtil } from '../utils/MixinUtil';

class MyRectangleBase extends Phaser.GameObjects.Rectangle implements IElement {}

interface MyRectangleBase extends Phaser.GameObjects.Rectangle, IElement {}

MixinUtil.apply(
  Phaser.GameObjects.Rectangle,
  [
    Element,
  ],
  [
    'destroy',
  ],
);

export const MyRectangle = MyRectangleBase;
