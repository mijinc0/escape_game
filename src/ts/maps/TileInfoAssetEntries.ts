import * as Asset from '../core/assets';

type EntryBase = { name: string; path: string };

const entries: EntryBase[] = [{ name: 'sample_tile', path: 'assets/tileset/sample_tile.json' }];

export const TileInfoAssetEntries: Asset.IAssetEntry[] = entries.map((base: EntryBase) => ({
  key: Asset.AssetCacheKey.tileInfo(base.name),
  path: base.path,
}));
