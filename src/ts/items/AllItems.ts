import { Item } from '../core/models/Item';

type ItemConfig = {name: string, description: string, iconFileName: string};

function createIconFilePath (filename: string) {
  const iconImageDirPath = 'assets/icons/items/';
  return `${iconImageDirPath}${filename}.png`;
}

export const AllItems = [
  {
    name: 'silverKeyA',
    description: 'this is test key A',
    iconFileName: 'icon_silver_key',
  },
  {
    name: 'silverKeyB',
    description: 'this is test key B',
    iconFileName: 'icon_silver_key',
  },
  {
    name: 'silverKeyC',
    description: 'this is test key C',
    iconFileName: 'icon_silver_key',
  },
].map((config: ItemConfig) => {
  const iconFilePath = createIconFilePath(config.iconFileName);
  return new Item(config.name, config.description, iconFilePath);
});