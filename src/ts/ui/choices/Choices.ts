import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import * as Render from '../../core/renders';
import { Button } from '../Button';

type ChoicesConfig = {
  scene: Phaser.Scene;
  message: string;
  items: string[];
};

export class Choices extends Ui.Group {
  choices: Ui.Group;

  constructor(config: ChoicesConfig, dx = 0, dy = 0, width = 0, height = 0, anchor?: Ui.IElement) {
    super(dx, dy, width, height, anchor);

    this.choices = this._createChoices(config);
    const message = this._createMessage(config);

    this.push(message, this.choices);
  }

  private _createMessage(config: ChoicesConfig): Ui.Group {
    const scene = config.scene;

    // message boxのサイズは固定。メッセージの内容を溢れないようにする
    const width = 400;
    const height = 64;
    const x = (this.width - width) / 2;
    const y = 0;
    const group = new Ui.Group(x, y, width, height);

    const baseRectangle = new Ui.Rectangle(scene, 0, 0, width, height, 0x000000, 0.9);
    baseRectangle.setOrigin(0);

    // messageはbaseRectangleに対して中央寄せ
    const baseRectangleCenterX = baseRectangle.x + baseRectangle.width / 2;
    const baseRectangleCenterY = baseRectangle.y + baseRectangle.height / 2;
    const textConfig = {
      fontSize: '20px',
    };
    const message = new Ui.Text(scene, baseRectangleCenterX, baseRectangleCenterY, config.message, textConfig);
    message.setOrigin(0.5);

    Render.UiRenderOrder.base(baseRectangle, message);

    scene.add.existing(baseRectangle);
    scene.add.existing(message);

    group.push(baseRectangle, message);

    return group;
  }

  private _createChoices(config: ChoicesConfig): Ui.Group {
    const ah = new Ui.RangeAlignmentHandler(16, Ui.Direction.Down);

    const buttonWidth = 300;

    const x = (this.width - buttonWidth) / 2;
    const y = 96;
    const group = new Ui.Group(x, y, this.width, this.height, null, ah);

    const scene = config.scene;

    const items = config.items.map((item: string) => {
      const buttonConfig = {
        scene: scene,
        text: item,
        fontColor: 'white',
        backgroundColor: 0x000000,
        backgroundAlpha: 0.9,
      };

      return new Button(buttonConfig, 0, 0, buttonWidth, 40);
    });

    group.push(...items);

    return group;
  }
}
