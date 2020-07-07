import { IActorSprite } from './IActorSprite';
import { GameFlags } from '../models/GameFlags';
import { Direction } from '../models/Direction';

export interface IActor {
  name: string;

  /**
   * 下位8bitはpage indexに使う
   * Actor毎にユニークなIDは8bitから上
   */
  id: number;

  eventId: number;

  flags: GameFlags;

  direction: Direction;
  
  sprite?: IActorSprite;

  update(frame: number): void;

  emit(event: string, ...args: any[]): boolean;

  on(event: string, listener: (...args: any[]) => void): this;

  removeAllListeners(event?: string): this;
}