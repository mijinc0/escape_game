import * as Phaser from 'phaser';

/**
 * UIの描写を行うためのシーン。
 * 主に他のシーンと並行して走るサブシーンとして使われる。
 */
export class Ui extends Phaser.Scene {
  init(): void {
    console.log('== start scene Ui ==');
  }
}
