import { IActorSprite } from './IActorSprite';
import { GameFlags } from '../models/GameFlags';

export interface IActor {
  name: string;

  id: number;

  eventId: number;

  sprite: IActorSprite;

  flags: GameFlags;
}