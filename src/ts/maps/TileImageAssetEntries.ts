import * as Asset from '../core/assets';

type EntryBase = { name: string; path: string };

const entries: EntryBase[] = [{ name: 'sample_tile', path: 'assets/tileset/sample_tile.png' }];

export const TileImageAssetEntries: Asset.IAssetEntry[] = entries.map((base: EntryBase) => ({
  key: Asset.AssetCacheKey.tileImage(base.name),
  path: base.path,
}));
