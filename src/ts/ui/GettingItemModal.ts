import * as Phaser from 'phaser';
import * as Ui from '../core/ui';
import * as Model from '../core/models';
import * as Render from '../core/renders';

type GettingItemModalConfig = {
  scene: Phaser.Scene;
  item: Model.Item;
  alpha: number;
};

export class GettingItemModal extends Ui.Group {
  private pAlpha: number;
  private baseRectangle: Ui.Rectangle;
  private itemIcon: Ui.Image;
  private itemNameText: Ui.Text;
  private itemDescriptionText: Ui.Text;

  constructor(
    config: GettingItemModalConfig,
    dx = 0,
    dy = 0,
    anchor?: Ui.IElement,
  ) {
    const width = 400;
    const height = 200;

    super(dx, dy, width, height, anchor, null);

    const scene = config.scene;

    const baseRectangle = new Ui.Rectangle(
      scene,
      0,
      0,
      width,
      height,
      0x000000,
      1,
    );
    baseRectangle.setOrigin(0);

    const iconKey = config.item.iconImageKey;
    const itemIcon = new Ui.Image(scene, 16, 32, iconKey);
    itemIcon.setOrigin(0, 0.5);

    const itemNameTextX = itemIcon.deltaX + itemIcon.width + 16;
    const itemNameText = new Ui.Text(
      scene,
      itemNameTextX,
      32,
      config.item.name,
      {
        fontSize: '24px',
      },
    );
    itemNameText.setOrigin(0, 0.5);

    const itemDescriptionText = new Ui.Text(
      scene,
      16,
      64,
      config.item.description,
      {
        fontSize: '20px',
        wordWrap: {
          width: width - 16,
          useAdvancedWrap: true,
        },
      },
    );
    itemDescriptionText.setOrigin(0);

    Render.UiRenderOrder.base(
      baseRectangle,
      itemIcon,
      itemNameText,
      itemDescriptionText,
    );

    scene.add.existing(baseRectangle);
    scene.add.existing(itemIcon);
    scene.add.existing(itemNameText);
    scene.add.existing(itemDescriptionText);

    this.push(baseRectangle, itemIcon, itemNameText, itemDescriptionText);
    this.baseRectangle = baseRectangle;
    this.itemIcon = itemIcon;
    this.itemNameText = itemNameText;
    this.itemDescriptionText = itemDescriptionText;
    this.alpha = config.alpha;
  }

  get alpha(): number {
    return this.pAlpha;
  }

  set alpha(v: number) {
    this.baseRectangle.alpha = v;
    this.itemIcon.alpha = v;
    this.itemNameText.alpha = v;
    this.itemDescriptionText.alpha = v;
    this.pAlpha = v;
  }
}
