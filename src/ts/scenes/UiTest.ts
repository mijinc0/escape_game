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

    const rec = new MyRectangle(this, 10, 10, 10, 10);
    
  }

  update(): void {
  }
}