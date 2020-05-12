import { EventEmitter } from 'events';
import { IActor } from './IActor';
import { Direction } from '../models/Direction';
import { IControllable } from '../models/IControllable';
import { Keys } from '../models/Keys';

type EventCallback = (...args: any[]) => void;

export class Actor extends EventEmitter implements IActor, IControllable {
  readonly name: string;

  readonly id: number;

  direction: Direction;
  
  keys: Keys;
  
  constructor(
    x: number,
    y: number,
    id: number,
    name: string,
    direction?: Direction,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.direction = direction ? direction : Direction.Down;
    // contrallable
    this.keys = null;
  }

  update(frame?: number): void {
    this.emit('update', this, frame);
  }

  addUpdateEvent(callback: EventCallback): void {
    this.on('update', callback);
  }
}