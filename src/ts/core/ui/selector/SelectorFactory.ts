import * as Phaser from 'phaser';
import { Selector } from './Selector';
import { ISelector } from './ISelector';
import { ISelectorCursor } from './ISelectorCursor';
import { DefaultSelectorCursor } from './DefaultSelectorCursor';
import { Keys } from '../../input/Keys';

export class SelectorFactory {
  static create(scene: Phaser.Scene, keys?: Keys, cursor?: ISelectorCursor): ISelector {
    keys = keys ? keys : this._createDefaultKeys(scene);
    cursor = cursor ? cursor : new DefaultSelectorCursor(scene);

    return new Selector(cursor, keys);
  }

  private static _createDefaultKeys(scene: Phaser.Scene): Keys {
    const cursor = scene.input.keyboard.createCursorKeys();

    return new Keys(cursor, cursor.space, cursor.shift);
  }
}