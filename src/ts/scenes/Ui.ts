import * as Phaser from 'phaser';
import * as Audio from '../core/audios';
import * as Scene from '../core/scenes';
import { IGameGlobal } from '../core/IGameGlobal';
import { GameGlobal } from '../GameGlobal';

/**
 * UIの描写を行うためのシーン。
 * 主に他のシーンと並行して走るサブシーンとして使われる。
 */
export class Ui extends Phaser.Scene implements Scene.IUiScene {
  readonly type = Scene.SceneType.Ui;

  phaserScene: Phaser.Scene;
  audioManager: Audio.IAudioManager;
  gameGlobal: IGameGlobal;

  init(): void {
    console.log('== start scene Ui ==');

    this.phaserScene = this;
    this.gameGlobal = GameGlobal;
    this.audioManager = new Audio.AudioManager(this, GameGlobal.audioConfig);
  }
}
