import { IAssetEntry } from '../core/assets/IAssetEntry';
import { AssetCacheKey } from '../core/assets/AssetCacheKey';

type EntryBase = {name: string, path: string};

const entries: EntryBase[] = [
  {name: 'sample_map', path: 'assets/map/sample_map.json'},
  {name: 'sample_map2', path: 'assets/map/sample_map2.json'},
];

export const TileMapAssetEntries: IAssetEntry[] = entries.map((base : EntryBase) => (
  {
    key: AssetCacheKey.tilemap(base.name),
    path: base.path,
  }
));