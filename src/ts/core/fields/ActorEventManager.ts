import * as Actor from '../actors';
import * as Event from '../events';
import { IActorEventManager } from './IActorEventManager';
import { EventEmitType } from './EventEmitType';
import { EventEntry } from './EventEntry';
import { IFieldActorStatusPage } from './IFieldActorStatusPage';

export class ActorEventManager implements IActorEventManager {
  scenarioEventManager: Event.ScenarioEventManager;
  eventEntries: EventEntry[];

  constructor(scenarioEventManager: Event.ScenarioEventManager, eventEntries: EventEntry[]) {
    this.scenarioEventManager = scenarioEventManager;
    this.eventEntries = eventEntries;
  }

  apply(actor: Actor.IActor, page: IFieldActorStatusPage): void {
    const eventId = page.eventId;
    const emitType = page.eventEmitType;

    if (emitType === EventEmitType.Immediately) {
      this._startImmediately(eventId)
    } else {
      this._regist(actor, eventId, emitType);
    }
  }

  private _startImmediately(eventId: number): void {
    const event = this.eventEntries.find((entry: EventEntry) => entry.id === eventId);

    if (!event) {
      console.warn(`actor event is not found (event id : ${eventId})`);
      return;
    }

    this.scenarioEventManager.start(event.getEvents());
  }

  private _regist(actor: Actor.IActor, eventId: number, emitType: string): void {
    const event = this.eventEntries.find((entry: EventEntry) => entry.id === eventId);

    if (!event) {
      console.warn(`actor event is not found (event id : ${eventId})`);
      return;
    }

    actor.on(emitType, () => {
      this.scenarioEventManager.start(event.getEvents());
    });
  }
}
