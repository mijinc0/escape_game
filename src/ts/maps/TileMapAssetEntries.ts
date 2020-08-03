import * as Asset from '../core/assets';

type EntryBase = { name: string; path: string };

const entries: EntryBase[] = [
  { name: 'debugroom', path: 'assets/map/debugroom.json' },
  { name: 'bathroom', path: 'assets/map/bathroom.json' },
  { name: 'hallway1FA', path: 'assets/map/hallway1FA.json' },
  { name: 'hallway1FB', path: 'assets/map/hallway1FB.json' },
  { name: 'hallway2FA', path: 'assets/map/hallway2FA.json' },
  { name: 'hallway2FB', path: 'assets/map/hallway2FB.json' },
  { name: 'roomA', path: 'assets/map/roomA.json' },
  { name: 'roomB', path: 'assets/map/roomB.json' },
  { name: 'roomC', path: 'assets/map/roomC.json' },
  { name: 'roomD', path: 'assets/map/roomD.json' },
  { name: 'roomE', path: 'assets/map/roomE.json' },
  { name: 'roomF', path: 'assets/map/roomF.json' },
  { name: 'roomG', path: 'assets/map/roomG.json' },
  { name: 'storeroom', path: 'assets/map/storeroom.json' },
  { name: 'toilet', path: 'assets/map/toilet.json' },
  { name: 'undergroundPathway', path: 'assets/map/undergroundPathway.json' },
];

export const TileMapAssetEntries: Asset.IAssetEntry[] = entries.map((base: EntryBase) => ({
  key: Asset.AssetCacheKey.tilemap(base.name),
  path: base.path,
}));
