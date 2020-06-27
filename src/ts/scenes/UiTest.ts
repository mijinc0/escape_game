import * as Phaser from 'phaser';

import { GameItems } from '../items/GameItems';;
import { IGameGlobal } from '../core/IGameGlobal';
import { GameFlags } from '../core/models/GameFlags';
import { GameVariables } from '../core/models/GameVariables';
import { ItemBag } from '../core/models/ItemBag';

import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { Selector } from '../core/ui/selector/Selector';
import { ISelector } from '../core/ui/selector/ISelector';
import { SelectorFactory } from '../core/ui/selector/SelectorFactory';
import { Keys } from '../core/input/Keys';
import { Item } from '../core/models/Item';
import { CacheKey } from '../core/utils/CacheKey';
import { MessageBox } from '../ui/messageBox/MessageBox';
import { ItemMenu } from '../ui/fieldMenu/ItemMenu';
import { ItemListElement } from '../ui/fieldMenu/ItemListElement';
import { ItemDescription } from '../ui/fieldMenu/ItemDescription';

export class UiTest extends Phaser.Scene {
  frame = 0;

  gameGlobal: IGameGlobal;

  selector: ISelector;

  init(): void {
    console.log('start scene Opening');

    this.gameGlobal = {
      flags : new GameFlags(),
      variables : new GameVariables(),  
      items : GameItems,
      ownItems : new ItemBag(),
    };
  }

  preload (): void {
    this._loadItemIcons();
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    this._setOwnItems();

    const fieldMenuConfig = {
      scene: this,
      gameGlobal: this.gameGlobal,
    };
    const fieldMenu = new FieldMenu(fieldMenuConfig, 10, 10);

    this.selector = new SelectorFactory(this).create();
    this.selector.setGroup(fieldMenu);

    /*
    // 枠はこうやって描くよというやつ
    const graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x0000aa }, fillStyle: { color: 0xaa0000 }});
    graphics.strokeRect(50, 50, 80, 40);
    graphics.strokeRect(150, 150, 80, 40);
    */
  }

  update(): void {
    this.frame++;
    
    if (this.frame === 90) {
      //this.itemD.text = 'this is changed text';
    }

    this.selector.update(this.frame);
  }

  private _loadItemIcons(): void {
    // TODO: 同じアイコンを使っていると重複するものがある場合があるので削除する処理を先にやる
    this.gameGlobal.items.entries.forEach((item: Item) => {
      const iconKey = CacheKey.itemIcon(item.name);
      this.load.image(iconKey, item.iconFilePath);
    });
  }

  private _setOwnItems(): void {
    this.gameGlobal.items.entries.forEach((item: Item) => {
      const size = Math.floor(Math.random() * 99);
      this.gameGlobal.ownItems.add(item, size);
    });
  }
}