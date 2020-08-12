import * as Asset from '../core/assets';

type EntryBase = { name: string; path: string };

const entries: EntryBase[] = [
  {
    name: 'titleImage',
    path: 'assets/images/titleImage.png',
  },
];

export const ImageAssetEntries: Asset.IAssetEntry[] = entries.map((base: EntryBase) => ({
  key: Asset.AssetCacheKey.image(base.name),
  path: base.path,
}));
