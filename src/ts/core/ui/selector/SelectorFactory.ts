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
    keys = keys ? keys : this._createDefaultKeys();
    cursor = cursor ? cursor : new DefaultSelectorCursor(this.scene);

    return new Selector(cursor, keys);
  }

  private _createDefaultKeys(): Keys {
    const cursor = this.scene.input.keyboard.createCursorKeys();

    return new Keys(cursor, cursor.space, cursor.shift);
  }
}