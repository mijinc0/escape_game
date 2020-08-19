import * as Phaser from 'phaser';
import * as Audio from '../audios';
import { ICustomScene } from './ICustomScene';
import { IGameGlobal } from '../IGameGlobal';

export interface IUiScene extends ICustomScene {
  phaserScene: Phaser.Scene;

  gameGlobal: IGameGlobal;

  audioManager: Audio.IAudioManager;
}