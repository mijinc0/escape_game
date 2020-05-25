import { EventRange } from './EventRange';
import { IScenarioEvent } from './IScenarioEvent';
import { Keys } from '../models/Keys';

export type ScenarioEventUpdateConfig = {
  keys?: Keys,

  events: EventRange[],

  currentEvents: IScenarioEvent[];
}