import { ActorEntry } from './ActorEntry';
import { EventEntry } from './EventEntry';

export interface IArea {
  id: number;

  tilemapKey: string;

  tileInfoKey: string;
  
  tileImageKey: string;

  actors: ActorEntry[];

  events: EventEntry[];
};