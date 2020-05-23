import { IScenarioEvent } from './IScenarioEvent';
import { IRange } from './IRange';
import { Keys } from '../models/Keys';

export type ScenarioEventUpdateConfig = {
  keys?: Keys,

  events: IRange<IScenarioEvent>[],

  currentEvents: IScenarioEvent[];
}