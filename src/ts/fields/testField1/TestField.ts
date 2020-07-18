import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import { ActorEntries } from './ActorEntries';
import { EventEntries } from './EventEntries';

export const TestField: Field.IField = {
  id: -1,

  tilemapKey: Asset.AssetCacheKey.tilemap('sample_map1'),

  tileInfoKey: Asset.AssetCacheKey.tileInfo('sample_tile'),

  tileImageKey: Asset.AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries,

  events: EventEntries,
};
