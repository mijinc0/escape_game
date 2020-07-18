import * as Phaser from 'phaser';
import * as Actor from '../actors';
import * as Audio from '../audios';
import * as Event from '../events';
import * as Field from '../fields';
import * as Input from '../input';
import { IGameGlobal } from '../IGameGlobal';

export interface IFieldScene {
  phaserScene: Phaser.Scene;

  frame: number;

  gameGlobal: IGameGlobal;

  primaryActor: Actor.IActor;

  actorsManager: Field.FieldActorsManager;

  scenarioEventManager: Event.IScenarioEventManager;

  audioManager: Audio.IAudioManager;

  keys: Input.Keys;
}
