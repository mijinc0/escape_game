import * as Phaser from 'phaser';
import { EventRange } from './EventRange';
import { IScenarioEvent } from './IScenarioEvent';
import { IGameGlobal } from '../IGameGlobal';
import { Keys } from '../input/Keys';

/**
 * シナリオイベントに色々と渡したいときにはこれを使うことで
 * オブジェクトがやたらめったら参照を持たないで済む
 */
export type ScenarioEventUpdateConfig = {
  
  scene?: Phaser.Scene,

  gameGlobal? : IGameGlobal,

  keys?: Keys,

  events: EventRange[],

  currentEvents: IScenarioEvent[];
}