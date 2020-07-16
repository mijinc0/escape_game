import { IActorEventRegistrar } from './IActorEventRegistrar';
import { EventEntry } from './EventEntry';
import { IFieldActorStatusPage } from './IFieldActorStatusPage';
import { ScenarioEventManager } from '../events/ScenarioEventManager';
import { IActor } from '../actors/IActor';
 
export class ActorEventRegistrar implements IActorEventRegistrar {
  scenarioEventManager: ScenarioEventManager;
  eventEntries: EventEntry[];

  constructor(scenarioEventManager: ScenarioEventManager, eventEntries: EventEntry[]) {
    this.scenarioEventManager = scenarioEventManager;
    this.eventEntries = eventEntries;
  }

  regist(actor: IActor, page: IFieldActorStatusPage): void {
    const eventId = page.eventId;
    const emitType = page.eventEmitType;
    this._regist(actor, eventId, emitType);
  }

  private _regist(actor: IActor, eventId: number, emitType: string): void {
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