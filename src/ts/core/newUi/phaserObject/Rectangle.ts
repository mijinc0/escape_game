import * as Phaser from 'phaser';
import { Element } from '../Element';
import { IElement } from '../IElement';
import { MixinUtil } from '../utils/MixinUtil';

class RectangleBase extends Phaser.GameObjects.Rectangle implements IElement {}

interface RectangleBase extends Phaser.GameObjects.Rectangle, IElement {}

MixinUtil.apply(
  RectangleBase,
  [
    Element,
  ],
  [
    'destroy',
    'on',
    'emit',
],
);

export const Rectangle = RectangleBase;
