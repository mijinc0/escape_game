import { IAssetEntry } from '../core/assets/IAssetEntry';
import { AssetCacheKey } from '../core/assets/AssetCacheKey';

type EntryBase = {name: string, path: string};

const entries: EntryBase[] = [
  {name: 'icon_silver_key', path: 'assets/icons/items/icon_silver_key.png'},
];

export const ItemIconAssetEntries: IAssetEntry[] = entries.map((base : EntryBase) => (
  {
    key: AssetCacheKey.itemIcon(base.name),
    path: base.path,
  }
));