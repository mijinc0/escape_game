import * as Phaser from 'phaser';
import { Keys } from '../core/input/Keys';
import { MessageBox } from '../ui/messageBox/MessageBox';

export class UiTest extends Phaser.Scene {
  frame = 0;

  init(): void {
    console.log('start scene Opening');
  }

  preload (): void {}
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    const messageBox = new MessageBox({scene: this, text: 'this is test'}, 10, 10, 400, 200);

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
}