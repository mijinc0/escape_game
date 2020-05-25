import { EventEntry } from './EventEntry';
import { EventPage } from './EventPage';
import { IScenarioEvent } from '../events/IScenarioEvent';
import { LineRange } from '../events/LineRange';

type ConditionCallback = () => boolean;

type EventPageConfig = {
  events: IScenarioEvent[],
  condition?: ConditionCallback,
};

export class EventEntryFactory {
  static create(id: number, pageConfigs: EventPageConfig[]): EventEntry {
    const pages = this._createPages(pageConfigs);
    return new EventEntry(id, pages);
  }

  private static _createPages(pageConfigs: EventPageConfig[]): EventPage[] {
    return pageConfigs.map((pageConfig: EventPageConfig) => (
      {
        events: new LineRange(pageConfig.events),
        condition: pageConfig.condition,
      }
    ));
  }
}