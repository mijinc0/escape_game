import * as Asset from '../core/assets';

type EntryBase = { name: string; path: string };

const entries: EntryBase[] = [
  { name: 'sample_map1', path: 'assets/map/sample_map.json' },
  { name: 'sample_map2', path: 'assets/map/sample_map2.json' },
];

export const TileMapAssetEntries: Asset.IAssetEntry[] = entries.map((base: EntryBase) => ({
  key: Asset.AssetCacheKey.tilemap(base.name),
  path: base.path,
}));
