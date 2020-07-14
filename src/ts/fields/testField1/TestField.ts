import { ActorEntries } from './ActorEntries';
import { EventEntries } from './EventEntries';
import { IField } from '../../core/fields/IField';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';

export const TestField: IField = {
  id: -1,

  tilemapKey: AssetCacheKey.tilemap('sample_map1'),

  tileInfoKey: AssetCacheKey.tileInfo('sample_tile'),
  
  tileImageKey: AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries,

  events: EventEntries,
}