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

export class UiTest extends Phaser.Scene {
  frame = 0;

  gameGlobal: IGameGlobal;

  init(): void {
    console.log('== start scene UiTest ==');

    this.gameGlobal = GameGlobal;
  }

  create(): void {
    this.cameras.main.setBackgroundColor(0xAADD66);

    // 画面サイズ
    const width = 640;
    const height = 480;

    const config = {
      scene: this,
      message: 'question ???????',
      items: [
        'yes',
        'no',
        'answer C',
        'answer D',
      ],
    };

    new Choices(config, 0, 64, width, height);
  }

  update(): void {
    this.frame++;
  }
}
