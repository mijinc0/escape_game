import * as Phaser from 'phaser';

export class TestScene extends Phaser.Scene {
  init(): void {
    console.log('start scene TestScene');
  }

  preload (): void {}
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);
  }
  
  update(): void {}
}