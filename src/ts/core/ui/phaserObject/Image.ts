import * as Phaser from 'phaser';
import { Element } from '../Element';
import { IElement } from '../IElement';
import { MixinUtil } from '../utils/MixinUtil';

class ImageBase extends Phaser.GameObjects.Image implements IElement {}

interface ImageBase extends Phaser.GameObjects.Image, IElement {}

MixinUtil.apply(ImageBase, [Element], ['destroy', 'on', 'emit']);

export class Image extends ImageBase {}
