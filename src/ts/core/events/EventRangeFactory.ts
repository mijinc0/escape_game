import { EventRange } from './EventRange';
import { LineRange } from './LineRange';
import { IScenarioEvent } from './IScenarioEvent';

export class EventRangeFactory {
  private events: IScenarioEvent[];

  constructor(...events: IScenarioEvent[]) {
    this.events = events;
  }

  create(): EventRange {
    return new LineRange(this.events);
  }
}