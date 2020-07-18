import * as Actor from '../actors';
import * as Event from '../events';
import { IActorEventRegistrar } from './IActorEventRegistrar';
import { EventEntry } from './EventEntry';
import { IFieldActorStatusPage } from './IFieldActorStatusPage';
 
export class ActorEventRegistrar implements IActorEventRegistrar {
  scenarioEventManager: Event.ScenarioEventManager;
  eventEntries: EventEntry[];

  constructor(scenarioEventManager: Event.ScenarioEventManager, eventEntries: EventEntry[]) {
    this.scenarioEventManager = scenarioEventManager;
    this.eventEntries = eventEntries;
  }

  regist(actor: Actor.IActor, page: IFieldActorStatusPage): void {
    const eventId = page.eventId;
    const emitType = page.eventEmitType;
    this._regist(actor, eventId, emitType);
  }

  private _regist(actor: Actor.IActor, eventId: number, emitType: string): void {
    const event = this.eventEntries.find((entry: EventEntry) => (entry.id === eventId));
    
    if (!event) {
      console.warn(`actor event is not found (event id : ${eventId})`);
      return;
    }

    actor.on(emitType, () => {
      this.scenarioEventManager.start(event.getEvents());
    });
  }
}