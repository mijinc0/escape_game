import * as Event from '../events';
import { EventEntry } from './EventEntry';

export class EventEntryFactory {
  static create(id: number, events: Event.IScenarioEvent[]): EventEntry {
    const factory = new Event.EventRangeFactory(...events);
    return new EventEntry(id, factory);
  }
}
