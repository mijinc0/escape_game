import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import * as ActorEntries from './ActorEntries';
import * as EventEntries from './EventEntries';
import { FieldIds } from '../FieldIds';

export const Hallway1FA: Field.IField = {
  id: FieldIds.Hallway1FA,

  tilemapKey: Asset.AssetCacheKey.tilemap('hallway1FA'),

  tileInfoKey: Asset.AssetCacheKey.tileInfo('sample_tile'),

  tileImageKey: Asset.AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries.default,

  events: EventEntries.default,
};
