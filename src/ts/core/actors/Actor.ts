import { EventEmitter } from 'events';
import { IActor } from './IActor';
import { IActorSprite } from './IActorSprite';
import { IControllable } from '../models/IControllable';
import { GameFlags } from '../models/GameFlags';
import { Keys } from '../input/Keys';

type EventCallback = (...args: any[]) => void;

export class Actor extends EventEmitter implements IActor, IControllable {
  readonly id: number;
  
  readonly name: string;

  readonly flags: GameFlags;

  eventId: number;
  
  sprite?: IActorSprite;
  
  keys?: Keys;

  constructor(
    id: number,
    name: string,
    eventId?: number,
    sprite?: IActorSprite,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.flags = new GameFlags();
    this.eventId = eventId ? eventId : -1;
    this.sprite = sprite ? sprite : null;
    this.keys = null;
  }

  update(frame: number): void {
    this.emit('update', this, frame);
  }

  addUpdateEvent(callback: EventCallback): void {
    this.on('update', callback);
  }
}