import { ActorEntry } from './ActorEntry';
import { EventEntry } from './EventEntry';

export interface IArea {
  id: number;

  mapFilePath: string;

  tilesetFilePath: string;
  
  tilesetImagePath: string;

  actors: ActorEntry[];

  events: EventEntry[];
};