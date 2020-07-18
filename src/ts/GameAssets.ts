import * as Asset from './core/assets';
import { ItemIconAssetEntries } from './items/ItemIconAssetEntries';
import { TileImageAssetEntries } from './maps/TileImageAssetEntries';
import { TileInfoAssetEntries } from './maps/TileInfoAssetEntries';
import { TileMapAssetEntries } from './maps/TileMapAssetEntries';
import { SpritesheetAssetEntries } from './sprites/SpritesheetAssetEntries';
import { AudioAssetEntries } from './audios/AudioAssetEntries';

/**
 * 最初に全てのアセットを読み込む前提になっている
 */
export const GameAssets: Asset.IAssetLoadingConfig = {
  tileMap: TileMapAssetEntries,

  tileImage: TileImageAssetEntries,

  tileInfo: TileInfoAssetEntries,

  itemIcon: ItemIconAssetEntries,

  audio: AudioAssetEntries,

  spritesheet: SpritesheetAssetEntries,
};
