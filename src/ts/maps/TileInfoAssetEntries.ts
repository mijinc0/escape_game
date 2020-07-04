import { IAssetEntry } from '../core/assets/IAssetEntry';
import { AssetCacheKey } from '../core/assets/AssetCacheKey';

type EntryBase = {name: string, path: string};

const entries: EntryBase[] = [
  {name: 'sample_tile', path: 'assets/tileset/sample_tile.json'},
];

export const TileInfoAssetEntries: IAssetEntry[] = entries.map((base : EntryBase) => (
  {
    key: AssetCacheKey.tileInfo(base.name),
    path: base.path,
  }
));