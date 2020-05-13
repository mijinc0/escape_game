import { EventEmitter } from 'events';
import { IActor } from './IActor';
import { IActorSprite } from './IActorSprite';
import { Direction } from '../models/Direction';
import { IControllable } from '../models/IControllable';
import { Keys } from '../models/Keys';

type EventCallback = (...args: any[]) => void;

export class Actor extends EventEmitter implements IActor, IControllable {
  readonly name: string;

  readonly id: number;
  
  readonly sprite: IActorSprite;
  
  direction: Direction;
  
  keys: Keys;

  constructor(
    id: number,
    name: string,
    sprite: IActorSprite,
    direction?: Direction,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.direction = direction ? direction : Direction.Down;
    this.keys = null;
  }

  update(frame?: number): void {
    this.emit('update', this, frame);
  }

  addUpdateEvent(callback: EventCallback): void {
    this.on('update', callback);
  }
}