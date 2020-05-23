import { IScenarioEvent } from './IScenarioEvent';
import { ScenarioEventUpdateConfig } from './ScenarioEventUpdateConfig';
import { RelationalChunk } from './RelationalChunk';
import { Keys } from '../models/Keys';

export interface IScenarioEventManager {
  keys: Keys;

  start(eventChunk: RelationalChunk<IScenarioEvent>): void;

  update(frame: number, config: ScenarioEventUpdateConfig): void;

  getCurrentEventSize(): number;
}