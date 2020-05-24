import { EventEmitter } from 'events';
import { IActor } from './IActor';
import { IActorSprite } from './IActorSprite';
import { Direction } from '../models/Direction';
import { IControllable } from '../models/IControllable';
import { GameFlags } from '../models/GameFlags';
import { Keys } from '../models/Keys';

type EventCallback = (...args: any[]) => void;

export class Actor extends EventEmitter implements IActor, IControllable {
  readonly name: string;

  readonly id: number;

  readonly eventId: number;
  
  readonly sprite: IActorSprite;

  readonly flags: GameFlags;
  
  direction: Direction;
  
  keys: Keys;

  constructor(
    id: number,
    eventId: number,
    name: string,
    sprite: IActorSprite,
    direction?: Direction,
  ) {
    super();
    this.id = id;
    this.eventId = eventId;
    this.name = name;
    this.sprite = sprite;
    this.direction = direction ? direction : Direction.Down;
    this.flags = new GameFlags();
    this.keys = null;
  }

  update(frame?: number): void {
    this.emit('update', this, frame);
  }

  addUpdateEvent(callback: EventCallback): void {
    this.on('update', callback);
  }
}