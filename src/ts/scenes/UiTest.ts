import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import * as Model from '../core/models';
import { GameGlobal } from '../GameGlobal';
import { IGameGlobal } from '../core/IGameGlobal';
import { GameItems } from '../items/GameItems';
import { GameTexts } from '../locales/GameTexts';
import { FieldMenu } from '../ui/fieldMenu/FieldMenu';
import { GettingItemModal } from '../ui/GettingItemModal';
import { Choices } from '../ui/choices/Choices';
import { Passcode } from '../ui/passcode/Passcode';

export class UiTest extends Phaser.Scene {
  frame = 0;

  gameGlobal: IGameGlobal;

  selector: Ui.ISelector;

  init(): void {
    console.log('== start scene UiTest ==');

    this.gameGlobal = GameGlobal;
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0xaadd66);

    // 画面サイズ
    const width = 640;
    const height = 480;

    const config = {
      scene: this,
      digits: 4,
    };

    const ui = new Passcode(config, 60, 60);

    this.selector = Ui.SelectorFactory.create(this);

    ui.registToSelector(this.selector);
  }

  update(): void {
    this.frame++;

    if (this.selector) {
      this.selector.update();
    }
  }
}
