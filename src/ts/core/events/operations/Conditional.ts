import { IScenarioEvent } from '../IScenarioEvent';

// 条件分岐の条件
type ConditionCallback = () => boolean;

// ifで指定されたイベントをキューに割り込ませるためのコールバック
type EventInterruptionCallback = (...events: IScenarioEvent[]) => void;

export class Conditional implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  protected eventInterruptionCallback: EventInterruptionCallback;
  protected conditionCallback: ConditionCallback;
  protected events: IScenarioEvent[];

  constructor (
    eventInterruptionCallback: EventInterruptionCallback,
    conditionCallback: ConditionCallback,
    ...events: IScenarioEvent[]
  ) {
    this.eventInterruptionCallback = eventInterruptionCallback;
    this.conditionCallback = conditionCallback;
    this.events = events;
  }

  update(frame: number): void {
    if (this.conditionCallback()) {
      this.eventInterruptionCallback(...this.events);
    }

    this.complete(frame);
  }
  
  complete(frame: number): void {
    this.isComplete = true;
  }
}