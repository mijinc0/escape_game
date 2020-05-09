import * as Phaser from 'phaser';

export class Opening extends Phaser.Scene {
  init(): void {
    console.log('start scene Opening');
  }

  preload (): void {}
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);
  }
  
  update(): void {}
}