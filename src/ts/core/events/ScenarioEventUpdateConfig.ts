import * as Phaser from 'phaser';
import { EventRange } from './EventRange';
import { IScenarioEvent } from './IScenarioEvent';
import { IGameGlobal } from '../IGameGlobal';
import { Keys } from '../models/Keys';

export type ScenarioEventUpdateConfig = {
  
  scene?: Phaser.Scene,

  gameGlobal? : IGameGlobal,

  keys?: Keys,

  events: EventRange[],

  currentEvents: IScenarioEvent[];
}