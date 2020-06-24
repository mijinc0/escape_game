import * as Phaser from 'phaser';

import { GameGlobal } from '../GameGlobal';

import { Keys } from '../core/input/Keys';
import { Item } from '../core/models/Item';
import { CacheKey } from '../core/utils/CacheKey';
import { MessageBox } from '../ui/messageBox/MessageBox';
import { ItemListElement } from '../ui/fieldMenu/ItemListElement';

export class UiTest extends Phaser.Scene {
  frame = 0;

  init(): void {
    console.log('start scene Opening');
  }

  preload (): void {
    this._loadItemIcons();
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    const messageBox = new MessageBox({scene: this, text: 'this is test'}, 10, 10, 400, 200);

    const item = GameGlobal.items.get('silverKeyA');
    const itemListElement = new ItemListElement({scene: this, item: item}, 200, 400, 240, 48);

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
      // this.uiRoot.y = 50;
      // this.uiRoot.height = 450
    }

  }

  private _loadItemIcons(): void {
    // TODO: 同じアイコンを使っていると重複するものがある場合があるので削除する処理を先にやる
    GameGlobal.items.entries.forEach((item: Item) => {
      const iconKey = CacheKey.itemIcon(item.name);
      this.load.image(iconKey, item.iconFilePath);
    });
  }
}