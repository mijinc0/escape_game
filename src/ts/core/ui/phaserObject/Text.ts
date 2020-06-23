import * as Phaser from 'phaser';
import { Element } from '../Element';
import { IElement } from '../IElement';
import { MixinUtil } from '../utils/MixinUtil';

class TextBase extends Phaser.GameObjects.Text implements IElement {}

interface TextBase extends Phaser.GameObjects.Text, IElement {}

MixinUtil.apply(
  TextBase,
  [
    Element,
  ],
  [
    'destroy',
    'on',
    'emit',
 ],
);

export class Text extends TextBase {}
