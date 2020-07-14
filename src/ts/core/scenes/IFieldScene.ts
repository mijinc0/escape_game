import * as Phaser from 'phaser';
import { IGameGlobal } from '../IGameGlobal';
import { FieldActorsManager } from '../fields/FieldActorsManager';
import { IScenarioEventManager } from '../events/IScenarioEventManager';
import { IActor } from '../actors/IActor';
import { Keys } from '../input/Keys';

export interface IFieldScene {
  phaserScene: Phaser.Scene;
  
  frame: number;

  gameGlobal: IGameGlobal;

  primaryActor: IActor;

  actorsManager: FieldActorsManager;

  scenarioEventManager: IScenarioEventManager;

  keys: Keys;
}