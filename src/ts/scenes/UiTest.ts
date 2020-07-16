import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import * as Model from '../core/models';
import { IGameGlobal } from '../core/IGameGlobal';
import { GameItems } from '../items/GameItems';;
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { GettingItemModal } from '../ui/GettingItemModal';

export class UiTest extends Phaser.Scene {
  frame = 0;

  gameGlobal: IGameGlobal;

  init(): void {
    console.log('== start scene UiTest ==');

    this.gameGlobal = {
      flags : new Model.GameFlags(),
      variables : new Model.GameVariables(),  
      items : GameItems,
      ownItems : new Model.ItemBag(),
    };
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    const config = {
      scene: this,
      item: GameItems.get('silverKeyA'),
      alpha: 1,
    };
    new GettingItemModal(config, 50, 50);
  }

  update(): void {
    this.frame++;
  }
}