import { EventEntry } from './EventEntry';
import { IScenarioEvent } from '../events/IScenarioEvent';
import { EventRangeFactory } from '../events/EventRangeFactory';

export class EventEntryFactory {
  static create(id: number, ...events: IScenarioEvent[]): EventEntry {
    const factory = new EventRangeFactory(...events);
    return new EventEntry(id, factory);
  }
}