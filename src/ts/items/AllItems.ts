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
].map((config: ItemConfig) => {
  const iconImageKey = Asset.AssetCacheKey.itemIcon(config.iconImageName);
  
  return new Model.Item(config.id, '', '', iconImageKey);
});
