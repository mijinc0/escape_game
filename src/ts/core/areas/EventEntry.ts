import { IRange } from '../events/IRange';
import { IScenarioEvent } from '../events/IScenarioEvent';

type EventRange = IRange<IScenarioEvent>;

type ConditionCallback = () => boolean;

type EventPage = {
  conditionCallback: ConditionCallback,
  events: EventRange,
};

export class EventEntry {
  readonly id: number;
  readonly pages: EventPage[];

  constructor(id: number, pages?: EventPage[]) {
    this.id = id;
    this.pages = pages ? pages : [];
  }

  addPage(conditionCallback: ConditionCallback, events: EventRange): void {
    this.pages.push({
      conditionCallback: conditionCallback,
      events: events,
    });
  }

  getEvents(): EventRange|null {
    // 最初にconditionCallbackの結果がtrueのものを取得する
    const page = this.pages.find((page: EventPage) => (page.conditionCallback()));

    return page ? page.events : null;
  }
}