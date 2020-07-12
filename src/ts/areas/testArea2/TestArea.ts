import { ActorEntries } from './ActorEntries';
import { EventEntries } from './EventEntries';
import { IArea } from '../../core/areas/IArea';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';

export const TestArea2: IArea = {
  id: -2,

  tilemapKey: AssetCacheKey.tilemap('sample_map2'),

  tileInfoKey: AssetCacheKey.tileInfo('sample_tile'),
  
  tileImageKey: AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries,

  events: EventEntries,
}