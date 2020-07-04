import { ISpritesheetAssetEntry } from '../core/assets/ISpritesheetAssetEntry';
import { AssetCacheKey } from '../core/assets/AssetCacheKey';

type EntryBase = {name: string, path: string, frameWidth: number, frameHeight: number};

const entries: EntryBase[] = [
  {name: 'sample_map', path: 'assets/map/sample_map.json', frameWidth: 32, frameHeight: 32},
];

export const SpritesheetAssetEntries: ISpritesheetAssetEntry[] = entries.map((base : EntryBase) => (
  {
    key: AssetCacheKey.spritesheet(base.name),
    path: base.path,
    frameWidth: base.frameWidth,
    frameHeight: base.frameHeight,
  }
));