import { IRange } from './IRange';
import { IScenarioEvent } from './IScenarioEvent';
import { Keys } from '../models/Keys';

type EventRange = IRange<IScenarioEvent>;

export type ScenarioEventUpdateConfig = {
  keys?: Keys,

  events: EventRange[],

  currentEvents: IScenarioEvent[];
}