import { IFieldActorEntry } from './IFieldActorEntry';
import { EventEntry } from './EventEntry';

export interface IField {
  id: number;

  tilemapKey: string;

  tileInfoKey: string;
  
  tileImageKey: string;

  actors: IFieldActorEntry[];

  events: EventEntry[];
};