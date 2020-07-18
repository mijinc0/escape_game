import * as Asset from '../core/assets';

type EntryBase = { name: string; path: string };

const entries: EntryBase[] = [
  { name: 'icon_silver_key', path: 'assets/icons/items/icon_silver_key.png' },
];

export const ItemIconAssetEntries: Asset.IAssetEntry[] = entries.map(
  (base: EntryBase) => ({
    key: Asset.AssetCacheKey.itemIcon(base.name),
    path: base.path,
  }),
);
