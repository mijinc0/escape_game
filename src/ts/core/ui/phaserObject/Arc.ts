import * as Phaser from 'phaser';
import { Element } from '../Element';
import { IElement } from '../IElement';
import { MixinUtil } from '../utils/MixinUtil';

class ArcBase extends Phaser.GameObjects.Arc implements IElement {}

interface ArcBase extends Phaser.GameObjects.Arc, IElement {}

MixinUtil.apply(ArcBase, [Element], ['destroy', 'on', 'emit']);

export class Arc extends ArcBase {}
