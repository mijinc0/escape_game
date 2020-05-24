import { IScenarioEvent } from '../IScenarioEvent';
import { LineRange } from '../LineRange';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';
 
type ConditionCallback = () => boolean;
type EventEntry = {conditionCallback: ConditionCallback, events: IScenarioEvent[]};

export class If implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private entries: EventEntry[];

  constructor(conditionCallback: ConditionCallback, events: IScenarioEvent[]) {
    this.isComplete = false;

    this.entries = [{
      conditionCallback: conditionCallback,
      events: events,
    }];
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    const matchedEntry = this.entries.find((entry: EventEntry) => (entry.conditionCallback()));
    
    // 条件判定コールバックの結果がtrueになるエントリーがあれば、そこに含まれるeventRangeを進行中のイベントに割り込ませる
    if (matchedEntry && config.events) {
      const events = matchedEntry.events;
      const interruptRange = new LineRange(events);
      config.events.unshift(interruptRange);
    }

    this.complete();

    return;
  }

  complete(): void {
    this.isComplete = true;
  }

  elseIf(conditionCallback: ConditionCallback): (...events: IScenarioEvent[]) => If {
    return ((...events: IScenarioEvent[]) => {
      this.entries.push({
        conditionCallback: conditionCallback,
        events: events,
      });

      return this;
    }).bind(this);
  }

  else(...events: IScenarioEvent[]): void {
    this.entries.push({
      conditionCallback: () => (true),
      events: events,
    });
  }
}