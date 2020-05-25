import { EventRange } from '../events/EventRange';

type ConditionCallback = () => boolean;

export type EventPage = {
  events: EventRange,
  condition?: ConditionCallback,
};
