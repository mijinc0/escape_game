import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import { ActorEntries } from './ActorEntries';
import { EventEntries } from './EventEntries';

export const TestField2: Field.IField = {
  id: -2,

  tilemapKey: Asset.AssetCacheKey.tilemap('sample_map2'),

  tileInfoKey: Asset.AssetCacheKey.tileInfo('sample_tile'),
  
  tileImageKey: Asset.AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries,

  events: EventEntries,
}