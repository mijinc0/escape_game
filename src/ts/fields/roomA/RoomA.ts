import * as Asset from '../../core/assets';
import * as Field from '../../core/fields';
import * as ActorEntries from './ActorEntries';
import * as EventEntries from './EventEntries';
import { FieldIds } from '../FieldIds';

export const RoomA: Field.IField = {
  id: FieldIds.RoomA,

  tilemapKey: Asset.AssetCacheKey.tilemap('roomA'),

  tileInfoKey: Asset.AssetCacheKey.tileInfo('sample_tile'),

  tileImageKey: Asset.AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries.default,

  events: EventEntries.default,
};
