import { EventRange } from '../events/EventRange';
import { EventRangeFactory } from '../events/EventRangeFactory';

export class EventEntry {
  readonly id: number;
  readonly eventRangeFactory: EventRangeFactory;

  constructor(id: number, eventRangeFactory: EventRangeFactory) {
    this.id = id;
    this.eventRangeFactory = eventRangeFactory;
  }

  getEvents(): EventRange {
    return this.eventRangeFactory.create();
  }
}