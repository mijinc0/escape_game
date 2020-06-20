import * as Phaser from 'phaser';
import { AbsComponentGroup } from '../../core/newUi/group/AbsComponentGroup';
import { Rectangle } from '../../core/newUi/phaserObject/Rectangle';
import { Text } from '../../core/newUi/phaserObject/Text';
import { OneWayPropertyBinder  } from '../../core/newUi/utils/OneWayPropertyBinder ';

type ButtonConfig = {scene: Phaser.Scene, text: string};

export class Button extends AbsComponentGroup<ButtonConfig> {
  text: string;

  textObject: Phaser.GameObjects.Text;

  protected init(config: ButtonConfig): void {
    this.text = config.text;

    const scene = config.scene;

    const baseRectangle = new Rectangle(scene, 0, 0, 150, 60, 0x00ff00, 0.8);
    const textObject = new Text(scene, 0, 0, this.text, {});

    this.textObject = textObject;

    baseRectangle.setOrigin(0);
    textObject.setOrigin(0);

    scene.add.existing(baseRectangle);
    scene.add.existing(textObject);

    OneWayPropertyBinder.bind(this, 'text', textObject);

    this.push(baseRectangle, textObject);
  }
}