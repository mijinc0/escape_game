import * as Phaser from 'phaser';
import * as Input from '../../input';
import { Selector } from './Selector';
import { ISelector } from './ISelector';
import { ISelectorCursor } from './ISelectorCursor';
import { DefaultSelectorCursor } from './DefaultSelectorCursor';

export class SelectorFactory {
  static create(
    scene: Phaser.Scene,
    keys?: Input.Keys,
    cursor?: ISelectorCursor,
  ): ISelector {
    keys = keys ? keys : this._createDefaultKeys(scene);
    cursor = cursor ? cursor : new DefaultSelectorCursor(scene);

    return new Selector(cursor, keys);
  }

  private static _createDefaultKeys(scene: Phaser.Scene): Input.Keys {
    const cursor = scene.input.keyboard.createCursorKeys();

    return new Input.Keys(cursor, cursor.space, cursor.shift);
  }
}
