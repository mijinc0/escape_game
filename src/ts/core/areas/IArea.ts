import { IActorEntry } from './IActorEntry';
import { EventEntry } from './EventEntry';

export interface IArea {
  id: number;

  tilemapKey: string;

  tileInfoKey: string;
  
  tileImageKey: string;

  actors: IActorEntry[];

  events: EventEntry[];
};