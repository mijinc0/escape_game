import { EventPage } from './EventPage';
import { EventRange } from '../events/EventRange';

type ConditionCallback = () => boolean;

export class EventEntry {
  readonly id: number;
  readonly pages: EventPage[];

  constructor(id: number, pages?: EventPage[]) {
    this.id = id;
    this.pages = pages ? pages : [];
  }

  addPage(events: EventRange, conditionCallback?: ConditionCallback): void {
    this.pages.push({
      events: events,
      condition: conditionCallback ? conditionCallback : null,
    });
  }

  getEvents(): EventRange|null {
    // 最初にconditionCallbackの結果がtrueのものを取得する
    // conditonCallbackが無いものはtrueとする
    const page = this.pages.find((page: EventPage) => (!page.condition || page.condition()));

    return page ? page.events : null;
  }
}