import * as Asset from '../core/assets';

type EntryBase = {
  name: string;
  path: string;
  frameWidth: number;
  frameHeight: number;
};

const entries: EntryBase[] = [
  {
    name: 'hero',
    path: 'assets/sprites/actor.png',
    frameWidth: 32,
    frameHeight: 32,
  },
  {
    name: 'door',
    path: 'assets/sprites/door.png',
    frameWidth: 32,
    frameHeight: 32,
  },
  {
    name: 'memo',
    path: 'assets/sprites/memo.png',
    frameWidth: 16,
    frameHeight: 16,
  },
  {
    name: 'someitem',
    path: 'assets/sprites/someitem.png',
    frameWidth: 16,
    frameHeight: 16,
  },
];

export const SpritesheetAssetEntries: Asset.ISpritesheetAssetEntry[] = entries.map((base: EntryBase) => ({
  key: Asset.AssetCacheKey.spritesheet(base.name),
  path: base.path,
  frameWidth: base.frameWidth,
  frameHeight: base.frameHeight,
}));
