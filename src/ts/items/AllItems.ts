import * as Asset from '../core/assets';
import * as Model from '../core/models';
import { GameItemIds } from './GameItemIds';

type ItemConfig = {
  id: number;
  iconImageName: string;
};

/**
 * nameとdescriptionはGameGlobal内で初期化するので一旦空にする
 */
export const AllItems = [
  {
    id: GameItemIds.KeyRoomA,
    iconImageName: 'icon_silver_key',
  },

  {
    id: GameItemIds.KeyRoomBC,
    iconImageName: 'icon_silver_key',
  },

  {
    id: GameItemIds.KeyRoomD,
    iconImageName: 'icon_silver_key',
  },

  {
    id: GameItemIds.KeyRoomE,
    iconImageName: 'icon_silver_key',
  },

  {
    id: GameItemIds.KeyRoomFG,
    iconImageName: 'icon_silver_key',
  },

  {
    id: GameItemIds.KeyStoreroom,
    iconImageName: 'icon_silver_key',
  },

  {
    id: GameItemIds.Hammer,
    iconImageName: 'icon_hammer',
  },

  {
    id: GameItemIds.BlokenDish,
    iconImageName: 'icon_blokendish',
  },

  {
    id: GameItemIds.RoomGSafetyboxKey,
    iconImageName: 'icon_toykey',
  },

  {
    id: GameItemIds.Lighter,
    iconImageName: 'icon_lighter',
  },

  {
    id: GameItemIds.LighterOil,
    iconImageName: 'icon_lighteroil',
  },

  {
    id: GameItemIds.Barl,
    iconImageName: 'icon_barl',
  },
].map((config: ItemConfig) => {
  const iconImageKey = Asset.AssetCacheKey.itemIcon(config.iconImageName);
  
  return new Model.Item(config.id, '', '', iconImageKey);
});
