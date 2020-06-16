import * as Phaser from 'phaser';
import { IElement } from '../core/newUi/IElement';
import { MyRectangle } from '../core/newUi/MyRectangle';

export class UiTest extends Phaser.Scene {
  frame = 0;
  myRecA: IElement;
  myRecB: IElement;

  init(): void {
    console.log('start scene Opening');
  }

  preload (): void {}
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    const group = this.add.group();
    const recG = this.add.rectangle(1000, 10, 100, 50, 0xff0000, 0.5);
    const recB = this.add.rectangle(1000, 10, 100, 50, 0x00ff00, 0.5);
    const recR = this.add.rectangle(1000, 10, 100, 50, 0x0000ff, 0.5);
    group.addMultiple([recG, recB, recR]);
    group.setXY(20, 20, 50, 50);
  }

  update(): void {
  }
}