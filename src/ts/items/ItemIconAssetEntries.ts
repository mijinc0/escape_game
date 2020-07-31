import * as Asset from '../core/assets';

type EntryBase = { name: string; path: string };

const entries: EntryBase[] = [
  { name: 'icon_barl', path: 'assets/icons/items/icon_barl.png' },
  { name: 'icon_blokendish', path: 'assets/icons/items/icon_blokendish.png' },
  { name: 'icon_hammer', path: 'assets/icons/items/icon_hammer.png' },
  { name: 'icon_lighteroil', path: 'assets/icons/items/icon_lighteroil.png' },
  { name: 'icon_lighter', path: 'assets/icons/items/icon_lighter.png' },
  { name: 'icon_silver_key', path: 'assets/icons/items/icon_silver_key.png' },
  { name: 'icon_toykey', path: 'assets/icons/items/icon_toykey.png' },
];

export const ItemIconAssetEntries: Asset.IAssetEntry[] = entries.map((base: EntryBase) => ({
  key: Asset.AssetCacheKey.itemIcon(base.name),
  path: base.path,
}));
