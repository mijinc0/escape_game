import { ActorEntries } from './ActorEntries';
import { EventEntries } from './EventEntries';
import { IField } from '../../core/fields/IField';
import { AssetCacheKey } from '../../core/assets/AssetCacheKey';

export const TestField2: IField = {
  id: -2,

  tilemapKey: AssetCacheKey.tilemap('sample_map2'),

  tileInfoKey: AssetCacheKey.tileInfo('sample_tile'),
  
  tileImageKey: AssetCacheKey.tileImage('sample_tile'),

  actors: ActorEntries,

  events: EventEntries,
}