import { IActorSprite } from './IActorSprite';
import { GameFlags } from '../models/GameFlags';
import { Direction } from '../models/Direction';

export interface IActor {
  name: string;

  id: number;

  eventId: number;

  flags: GameFlags;

  sprite: IActorSprite;

  direction: Direction;

  update(frame: number): void;

  emit(event: string, ...args: any[]): boolean;

  on(event: string, listener: (...args: any[]) => void): this;

  removeAllListeners(event?: string): this;
}