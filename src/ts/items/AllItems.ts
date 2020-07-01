import { Item } from '../core/models/Item';

type ItemConfig = {id:number, name: string, description: string, iconFileName: string};

function createIconFilePath (filename: string) {
  const iconImageDirPath = 'assets/icons/items/';
  return `${iconImageDirPath}${filename}.png`;
}

export const AllItems = [
  {
    id: 0,
    name: 'silverKeyA',
    description: 'this is test key A',
    iconFileName: 'icon_silver_key',
  },
  {
    id: 1,
    name: 'silverKeyB',
    description: 'this is test key B',
    iconFileName: 'icon_silver_key',
  },
  {
    id: 2,
    name: 'silverKeyC',
    description: 'this is test key C',
    iconFileName: 'icon_silver_key',
  },
  {
    id: 3,
    name: 'silverKeyD',
    description: 'this is test key D',
    iconFileName: 'icon_silver_key',
  },
  {
    id: 4,
    name: 'silverKeyE',
    description: 'this is test key E',
    iconFileName: 'icon_silver_key',
  },
  {
    id: 5,
    name: 'silverKeyF',
    description: '日本語もいける部屋の鍵F',
    iconFileName: 'icon_silver_key',
  },
  {
    id: 6,
    name: 'silverKeyG',
    description: 'this is test key G',
    iconFileName: 'icon_silver_key',
  },
  {
    id: 7,
    name: 'silverKeyG',
    description: 'this is test key G',
    iconFileName: 'icon_silver_key',
  },
  {
    id: 8,
    name: 'silverKeyG',
    description: 'this is test key G this is test key this is test key this is test key this is test key this is test key',
    iconFileName: 'icon_silver_key',
  },
].map((config: ItemConfig) => {
  const iconFilePath = createIconFilePath(config.iconFileName);
  return new Item(config.id, config.name, config.description, iconFilePath);
});