import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import * as Model from '../core/models';
import { IGameGlobal } from '../core/IGameGlobal';
import { GameItems } from '../items/GameItems';
import { GameTexts } from '../locales/GameTexts';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { GettingItemModal } from '../ui/GettingItemModal';

export class UiTest extends Phaser.Scene {
  frame = 0;

  gameGlobal: IGameGlobal;

  init(): void {
    console.log('== start scene UiTest ==');

    this.gameGlobal = {
      flags: new Model.GameFlags(),
      variables: new Model.GameVariables(),
      ownItems: new Model.ItemBag(),
      texts: GameTexts.ja,
      items: GameItems(GameTexts.ja.item),
    };
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0x9955ff);

    const config = {
      scene: this,
      item: this.gameGlobal.items.get(0),
      alpha: 1,
    };
    new GettingItemModal(config, 50, 50);
  }

  update(): void {
    this.frame++;
  }
}
