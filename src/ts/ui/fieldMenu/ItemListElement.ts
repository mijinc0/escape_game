import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { IItemDescription } from './IItemDescription';
import { Button } from '../Button';
import { Item } from '../../core/models/Item';
import { CacheKey } from '../../core/utils/CacheKey';

type ItemListElementConfig = {
  scene: Phaser.Scene,
  item: Item,
  description?: IItemDescription,
  fontSize?: string,
  fontColor?: string,
  fontFamilly?: string,
  backgroundColor?: number,
  backgroundAlpha?: number,
};

export class ItemListElement extends Ui.AbsComponentGroup<ItemListElementConfig> {
  init(config: ItemListElementConfig): void {
    // あると邪魔になるので設定されていたら消しておく
    this.alignmentHandler = null;

    const scene = config.scene;
    const item = config.item;

    const bgColor = config.backgroundColor ? config.backgroundColor : 0x000000;
    const bgAlpha = config.backgroundAlpha ? config.backgroundAlpha : 0.8;
    const baseRectangle = new Ui.Rectangle(scene, 0, 0, this.width, this.height, bgColor, bgAlpha);
    baseRectangle.setOrigin(0);

    const centerOfBaseRectangleY = baseRectangle.deltaY + (baseRectangle.height / 2);
    
    const iconKey = CacheKey.itemIcon(item.name);
    const itemIcon = new Ui.Image(scene, 10, centerOfBaseRectangleY, iconKey);
    itemIcon.setOrigin(0, 0.5);

    const itemNameTextX = itemIcon.deltaX + itemIcon.width + 10;
    const itemNameText = new Ui.Text(scene, itemNameTextX, centerOfBaseRectangleY, item.name, {});
    itemNameText.setOrigin(0, 0.5);

    const itemSizeTextX = baseRectangle.deltaX + baseRectangle.width - 10;
    const itemSizeText = new Ui.Text(scene, itemSizeTextX, centerOfBaseRectangleY, item.size.toString(), {});
    itemSizeText.setOrigin(1, 0.5);

    scene.add.existing(baseRectangle);
    scene.add.existing(itemIcon);
    scene.add.existing(itemNameText);
    scene.add.existing(itemSizeText);
    
    this.push(baseRectangle, itemIcon, itemNameText, itemSizeText);
  }
}