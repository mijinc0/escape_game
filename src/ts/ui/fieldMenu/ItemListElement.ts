import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { IItemListElementConfig } from './IItemListElementConfig';
import { Item } from '../../core/models/Item';
import { UiRenderOrder } from '../../core/renders/UiRenderOrder';
import { CacheKey } from '../../core/utils/CacheKey';

/**
 * Ui.BoxやUi.TextBox,Ui.Containerを組み合わせるよりも別で作ったほうが良いと判断
 */
export class ItemListElement extends Ui.PhaserObjectNode {
  private scene: Phaser.Scene;
  private item: Item;
  private baseRectangle: Phaser.GameObjects.Rectangle;
  private itemIconImage: Phaser.GameObjects.Image;
  private itemNameText: Phaser.GameObjects.Text;
  private itemSizeText: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    item: Item,
    config: IItemListElementConfig,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ) {
    super(x, y, width, height);
    
    this.scene = scene;
    this.item = item;

    const basePosition = this.scene.cameras.main.worldView;
    const marginX = 10;

    this.baseRectangle = this._createBaseRectangle(basePosition, config);

    // itemSizeTextのxは、this.baseRectangleの左端からmarginXをとった場所に合わせる
    const iconSize = 32;
    const itemIconLeft = this.baseRectangle.x + marginX;
    const itemIconTop = this.baseRectangle.y + this._getMarginY(this.baseRectangle.height, iconSize);
    this.itemIconImage = this._createItemIconImage(item, itemIconLeft, itemIconTop);

    // itemNameTextのxは、itemIconImageの右端からmarginXをとった場所に合わせる
    const itemNameTextLeft = this.itemIconImage.getTopRight().x + marginX;
    const itemNameTextTop = this.baseRectangle.y + this._getMarginY(this.baseRectangle.height, config.fontSize);
    this.itemNameText = this._createItemText(item.name, itemNameTextLeft, itemNameTextTop, config);
    this.itemNameText.setOrigin(0);

    // itemSizeTextのxは、this.baseRectangleの右端から-marginXをとった場所に合わせる
    const itemSizeTextRight = this.baseRectangle.getTopRight().x - marginX;
    const itemSizeTextTop = this.baseRectangle.y + this._getMarginY(this.baseRectangle.height, config.fontSize);
    this.itemSizeText = this._createItemText(item.size.toString(), itemSizeTextRight, itemSizeTextTop, config);
    this.itemSizeText.setOrigin(1, 0);
    
    UiRenderOrder.base(this.baseRectangle, this.itemIconImage, this.itemNameText, this.itemSizeText);
  }

  getGameObjects(): Phaser.GameObjects.GameObject[] {
    return [this.baseRectangle, this.itemIconImage, this.itemNameText, this.itemSizeText];
  }

  private _createBaseRectangle(basePosition: Phaser.Geom.Rectangle, config: IItemListElementConfig): Phaser.GameObjects.Rectangle {
    this.baseRectangle = this.scene.add.rectangle(
      basePosition.x + this.position.x,
      basePosition.y + this.position.y,
      this.size.width,
      this.size.height,
      config.backgroundColor,
      config.backgroundAlpha,
    );

    this.baseRectangle.setOrigin(0);

    return this.baseRectangle;
  }

  private _createItemIconImage(item: Item, x: number, y: number): Phaser.GameObjects.Image {
    const itemIconKey = CacheKey.itemIcon(item.name);
    const itemIconImage = this.scene.add.image(x, y, itemIconKey);
    itemIconImage.setOrigin(0);

    return itemIconImage;
  }

  private _createItemText(text: string, x: number, y: number, config: IItemListElementConfig): Phaser.GameObjects.Text {
    const itemText = this.scene.add.text(x, y, text);
    itemText.setColor(config.fontColor);
    itemText.setFontSize(config.fontSize);
    itemText.setFontFamily(config.fontFamily);

    return itemText;
  }

  /**
   * parentHeightの中央とchildHeightの中央が合わせるようなマージンを取得する
   * 
   * @param parentHeight 
   * @param childHeight 
   */
  private _getMarginY(parentHeight: number, childHeight: number): number {
    return (parentHeight - childHeight) / 2;
  }
}