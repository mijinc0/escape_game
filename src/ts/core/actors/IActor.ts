import { IActorSprite } from './IActorSprite';
import { GameFlags } from '../models/GameFlags';

export interface IActor {
  name: string;

  id: number;

  flags: GameFlags;
  
  sprite?: IActorSprite;

  update(...data: any[]): void;

  emit(event: string, ...args: any[]): boolean;

  on(event: string, listener: (...args: any[]) => void): this;

  removeAllListeners(event?: string): this;
}