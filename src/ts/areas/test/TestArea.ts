import { ActorEntries } from './ActorEntries';
import { EventEntries } from './EventEntries';
import { IArea } from '../../core/areas/IArea';

export const TestArea: IArea = {
  mapFilePath: 'assets/map/sample_map.json',

  tilesetFilePath: 'assets/tileset/sample_tile.json',
  
  tilesetImagePath: 'assets/tileset/sample_tile.png',

  actors: ActorEntries,

  events: EventEntries,
}