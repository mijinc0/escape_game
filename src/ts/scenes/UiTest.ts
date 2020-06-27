import * as Phaser from 'phaser';

import { GameGlobal } from '../GameGlobal';

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
  selector: ISelector;

  init(): void {
    console.log('start scene Opening');
  }

  preload (): void {
    this._loadItemIcons();
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    this.selector = new SelectorFactory(this).create();

    //const messageBox = new MessageBox({scene: this, text: 'this is test'}, 10, 10, 400, 200);

    const itemA = GameGlobal.items.get('silverKeyA');
    const itemB = GameGlobal.items.get('silverKeyA');
    const itemC = GameGlobal.items.get('silverKeyA');
    const itemD = GameGlobal.items.get('silverKeyA');
    
    const items = [itemA, itemB, itemC, itemD];

    console.log(`game item entries : ${GameGlobal.items.entries.length}`);

    const itemMenu = new ItemMenu({scene: this, items: GameGlobal.items.entries}, 10, 50);

    this.selector.setGroup(itemMenu.list);

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
    GameGlobal.items.entries.forEach((item: Item) => {
      const iconKey = CacheKey.itemIcon(item.name);
      this.load.image(iconKey, item.iconFilePath);
    });
  }
}