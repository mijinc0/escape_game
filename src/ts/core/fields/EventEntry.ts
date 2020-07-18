import * as Event from '../events';

export class EventEntry {
  readonly id: number;
  readonly eventRangeFactory: Event.EventRangeFactory;

  constructor(id: number, eventRangeFactory: Event.EventRangeFactory) {
    this.id = id;
    this.eventRangeFactory = eventRangeFactory;
  }

  getEvents(): Event.EventRange {
    return this.eventRangeFactory.create();
  }
}
