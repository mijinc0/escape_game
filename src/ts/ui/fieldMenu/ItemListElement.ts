import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import * as Model from '../../core/models';
import * as Render from '../../core/renders';
import { IItemDescription } from './IItemDescription';

type ItemListElementConfig = {
  scene: Phaser.Scene,
  item: Model.Item,
  description?: IItemDescription,
  backgroundColor?: number,
  backgroundAlpha?: number,
};

export class ItemListElement extends Ui.Group {
  private item: Model.Item;

  constructor(config: ItemListElementConfig, dx = 0, dy = 0, width = 0, height = 0, anchor?: Ui.IElement) {
    super(dx, dy, width, height, anchor);

    this.alignmentHandler = null;
    this.entries = [];
    this.currentIndex = -1;
    this.item = config.item;

    this._initEntries(config);

    this._initEvents(config);
  }

  private _initEntries(config: ItemListElementConfig): void {
    const scene = config.scene;

    const bgColor = config.backgroundColor ? config.backgroundColor : 0x000000;
    const bgAlpha = config.backgroundAlpha ? config.backgroundAlpha : 0.8;
    const baseRectangle = new Ui.Rectangle(scene, 0, 0, this.width, this.height, bgColor, bgAlpha);
    baseRectangle.setOrigin(0);

    const centerOfBaseRectangleY = baseRectangle.deltaY + (baseRectangle.height / 2);
    
    const iconKey = this.item.iconImageKey;
    const itemIcon = new Ui.Image(scene, 10, centerOfBaseRectangleY, iconKey);
    itemIcon.setOrigin(0, 0.5);

    const itemNameTextX = itemIcon.deltaX + itemIcon.width + 10;
    const itemNameText = new Ui.Text(scene, itemNameTextX, centerOfBaseRectangleY, this.item.name, {});
    itemNameText.setOrigin(0, 0.5);

    const itemSizeTextX = baseRectangle.deltaX + baseRectangle.width - 10;
    const itemSizeText = new Ui.Text(scene, itemSizeTextX, centerOfBaseRectangleY, this.item.size.toString(), {});
    itemSizeText.setOrigin(1, 0.5);

    Render.UiRenderOrder.base(baseRectangle, itemIcon, itemNameText, itemSizeText);

    scene.add.existing(baseRectangle);
    scene.add.existing(itemIcon);
    scene.add.existing(itemNameText);
    scene.add.existing(itemSizeText);
    
    this.push(baseRectangle, itemIcon, itemNameText, itemSizeText);
  }

  private _initEvents(config: ItemListElementConfig): void {
    const itemDescription = config.description ? config.description : null;

    // OverになったらDescriptionのテキストを書き換える
    this.on(Ui.ElementEventNames.Over, () => {
      if (itemDescription) {
        itemDescription.text = this.item.description;
      }
    });

    // OutになったらDescriptionのテキストをdefaultに戻す
    this.on(Ui.ElementEventNames.Out, () => {
      itemDescription.text = itemDescription.defaultText;
    });
  }
}