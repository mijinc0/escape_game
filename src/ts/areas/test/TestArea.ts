import { ActorEntries } from './ActorEntries';
import { EventEntries } from './EventEntries';
import { IArea } from '../../core/areas/IArea';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';

export const TestArea: IArea = {
  id: -1,

  tilemapKey: AssetCacheKey.tilemap('sample_map'),

  tileInfoKey: AssetCacheKey.tileInfo('sample_tile'),
  
  tileImageKey: AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries,

  events: EventEntries,
}