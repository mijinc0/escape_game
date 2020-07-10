import * as Phaser from 'phaser';
import { GameItems } from '../items/GameItems';;
import { IGameGlobal } from '../core/IGameGlobal';
import { GameFlags } from '../core/models/GameFlags';
import { GameVariables } from '../core/models/GameVariables';
import { ItemBag } from '../core/models/ItemBag';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { ISelector } from '../core/ui/selector/ISelector';
import { SelectorFactory } from '../core/ui/selector/SelectorFactory';
import { Item } from '../core/models/Item';

export class UiTest extends Phaser.Scene {
  frame = 0;

  gameGlobal: IGameGlobal;

  selector: ISelector;

  init(): void {
    console.log('== start scene UiTest ==');

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

    this.selector = SelectorFactory.create(this);

    const fieldMenuConfig = {
      scene: this,
      gameGlobal: this.gameGlobal,
    };
    const fieldMenu = new FieldMenu(fieldMenuConfig);
    fieldMenu.registSelector(this.selector);
  }

  update(): void {
    this.frame++;
    
    if (this.frame === 90) {
      //this.itemD.text = 'this is changed text';
    }

    this.selector.update(this.frame);
  }

  private _loadItemIcons(): void {
    // TODO: 現在はLoadingに全て詰め込んだのでLoadingを経由するか、独自でロード処理を書く必要がある
  }

  private _setOwnItems(): void {
    this.gameGlobal.items.entries.forEach((item: Item) => {
      const size = Math.floor(Math.random() * 99);
      this.gameGlobal.ownItems.add(item, size);
    });
  }
}