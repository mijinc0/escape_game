import * as Asset from '../core/assets';

type EntryBase = { name: string; path: string };

const entries: EntryBase[] = [
  // BGM
  {
    name: 'bgm_field',
    path: 'assets/audio/bgm_maoudamashii_8bit26.ogg',
  },

  // SE
  {
    name: 'se_footstep',
    path: 'assets/audio/se_maoudamashii_se_footstep02.ogg',
  },
  {
    name: 'se_open_fieldmenu',
    path: 'assets/audio/se_maoudamashii_system13.ogg',
  },
  {
    name: 'se_close_fieldmenu',
    path: 'assets/audio/se_maoudamashii_system19.ogg',
  },
  {
    name: 'se_ui_cancel',
    path: 'assets/audio/se_maoudamashii_system18.ogg',
  },
  {
    name: 'se_ui_curor_move',
    path: 'assets/audio/se_maoudamashii_system44.ogg',
  },
  {
    name: 'se_ui_select',
    path: 'assets/audio/se_maoudamashii_system47.ogg',
  },
  {
    name: 'se_door',
    path: 'assets/audio/se_maoudamashii_se_door04.ogg',
  },
  {
    name: 'se_open_drawer',
    path: 'assets/audio/se_maoudamashii_se_door03.ogg',
  },
  {
    name: 'se_find_item',
    path: 'assets/audio/se_maoudamashii_onepoint07.ogg',
  },
  {
    name: 'se_glass_break',
    path: 'assets/audio/se_soundeffect-lab_glass-break3.mp3',
  },
];

export const AudioAssetEntries: Asset.IAssetEntry[] = entries.map((base: EntryBase) => ({
  key: Asset.AssetCacheKey.audio(base.name),
  path: base.path,
}));
