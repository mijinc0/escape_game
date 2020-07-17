import { IAssetEntry } from '../core/assets/IAssetEntry';
import { AssetCacheKey } from '../core/assets/AssetCacheKey';

type EntryBase = {name: string, path: string};

const entries: EntryBase[] = [
  // BGM
  {name: 'bgm_field', path: 'assets/audio/bgm_maoudamashii_8bit26.ogg'},

  // SE
  {name: 'se_footstep', path: 'assets/audio/se_maoudamashii_se_footstep02.ogg'},
];

export const AudioAssetEntries: IAssetEntry[] = entries.map((base : EntryBase) => (
  {
    key: AssetCacheKey.audio(base.name),
    path: base.path,
  }
));