import * as Scene from '../../scenes';
import { IScenarioEvent } from '../IScenarioEvent';
import { LineRange } from '../LineRange';

type CriteriaCallback = () => boolean;
type EventEntry = {
  criteriaCallback: CriteriaCallback;
  events: IScenarioEvent[];
};

export class If implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private entries: EventEntry[];

  constructor(criteriaCallback: CriteriaCallback, events: IScenarioEvent[]) {
    this.isComplete = false;

    this.entries = [
      {
        criteriaCallback: criteriaCallback,
        events: events,
      },
    ];
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: Scene.IFieldScene): void {
    const matchedEntry = this.entries.find((entry: EventEntry) => entry.criteriaCallback());

    // 条件判定コールバックの結果がtrueになるエントリーがあれば、そこに含まれるeventRangeを進行中のイベントに割り込ませる
    if (matchedEntry) {
      const events = scene.scenarioEventManager.events;

      const interruptEvents = matchedEntry.events;
      const interruptRange = new LineRange(interruptEvents);

      events.unshift(interruptRange);
    }

    this.complete();

    return;
  }

  complete(): void {
    this.isComplete = true;
  }

  elseIf(criteriaCallback: CriteriaCallback): (...events: IScenarioEvent[]) => If {
    return (...events: IScenarioEvent[]) => {
      this.entries.push({
        criteriaCallback: criteriaCallback,
        events: events,
      });

      return this;
    };
  }

  else(...events: IScenarioEvent[]): If {
    this.entries.push({
      criteriaCallback: () => true,
      events: events,
    });

    return this;
  }
}
