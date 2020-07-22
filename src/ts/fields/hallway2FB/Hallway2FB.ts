import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import * as ActorEntries from './ActorEntries';
import * as EventEntries from './EventEntries';
import { FieldIds } from '../FieldIds';

export const Hallway2FB: Field.IField = {
  id: FieldIds.Hallway2FB,

  tilemapKey: Asset.AssetCacheKey.tilemap('hallway2FB'),

  tileInfoKey: Asset.AssetCacheKey.tileInfo('sample_tile'),

  tileImageKey: Asset.AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries.default,

  events: EventEntries.default,
};
