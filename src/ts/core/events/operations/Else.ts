import { Conditional } from './Conditional';
import { IScenarioEvent } from '../IScenarioEvent';

type EventInterruptionCallback = (...events: IScenarioEvent[]) => void;

export class Else extends Conditional {
  constructor (
    eventInterruptionCallback: EventInterruptionCallback,
    ...events: IScenarioEvent[]
  ) {
    const conditionCallback = () => (true);
    super(eventInterruptionCallback, conditionCallback, ...events);
  }
}