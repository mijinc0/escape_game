import * as Phaser from 'phaser';
import { Selector } from './Selector';
import { ISelector } from './ISelector';
import { ISelectorCursor } from './ISelectorCursor';
import { DefaultSelectorCursor } from './DefaultSelectorCursor';
import { Keys } from '../../input/Keys';

export class SelectorFactory {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(keys?: Keys, cursor?: ISelectorCursor): ISelector {
    cursor = cursor ? cursor : new DefaultSelectorCursor(this.scene);

    return new Selector(cursor, keys);
  }
}