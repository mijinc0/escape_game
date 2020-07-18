import * as Asset from '../core/assets';
import * as Model from '../core/models';

type ItemConfig = {id: number, name: string, description: string, iconImageName: string};

export const AllItems = [
  {
    id: 0,
    name: 'silverKeyA',
    description: 'this is test key loooooooooooooooooooo oooooooooooooooo ooooooooooooooooooog descrition',
    iconImageName: 'icon_silver_key',
  },
  {
    id: 1,
    name: 'silverKeyB',
    description: 'this is test key B',
    iconImageName: 'icon_silver_key',
  },
  {
    id: 2,
    name: 'silverKeyC',
    description: 'this is test key C',
    iconImageName: 'icon_silver_key',
  },
  {
    id: 3,
    name: 'silverKeyD',
    description: 'this is test key D',
    iconImageName: 'icon_silver_key',
  },
  {
    id: 4,
    name: 'silverKeyE',
    description: 'this is test key E',
    iconImageName: 'icon_silver_key',
  },
  {
    id: 5,
    name: 'silverKeyF',
    description: '日本語もいける部屋の鍵F',
    iconImageName: 'icon_silver_key',
  },
  {
    id: 6,
    name: 'silverKeyG',
    description: 'this is test key G',
    iconImageName: 'icon_silver_key',
  },
  {
    id: 7,
    name: 'silverKeyG',
    description: 'this is test key G',
    iconImageName: 'icon_silver_key',
  },
  {
    id: 8,
    name: 'silverKeyG',
    description: 'this is test key G this is test key this is test key this is test key this is test key this is test key',
    iconImageName: 'icon_silver_key',
  },
].map((config: ItemConfig) => {
  const iconImageKey = Asset.AssetCacheKey.itemIcon(config.iconImageName);
  return new Model.Item(config.id, config.name, config.description, iconImageKey);
});