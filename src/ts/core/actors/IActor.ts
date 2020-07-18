import * as Model from '../models';
import { IActorSprite } from './IActorSprite';

export interface IActor {
  name: string;

  id: number;

  flags: Model.GameFlags;
  
  sprite?: IActorSprite;

  update(...data: any[]): void;

  emit(event: string, ...args: any[]): boolean;

  on(event: string, listener: (...args: any[]) => void): this;

  removeAllListeners(event?: string): this;
}