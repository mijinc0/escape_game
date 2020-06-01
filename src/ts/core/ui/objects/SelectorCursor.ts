import * as Phaser from 'phaser';
import { Node } from '../Node';
import { ISelectorCursor } from '../selector/ISelectorCursor';
import { UiRenderOrder } from '../../renders/UiRenderOrder';

export class SelectorCursor implements ISelectorCursor {
  private rectangleObject: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    this.rectangleObject = scene.add.rectangle(0, 0, 0, 0, 0xFFFFFF, 0.2);
    this.rectangleObject.setOrigin(0);

    UiRenderOrder.base(this.rectangleObject);
  }

  update(): void {}

  destroy(): null {
    this.rectangleObject.destroy();

    return null;
  }

  visible(): void {
    this.rectangleObject.visible = true;
  } 

  invisible(): void {
    this.rectangleObject.visible = false;
  } 

  on(targetNode: Node): void {
    this.rectangleObject.setPosition(
      targetNode.position.x,
      targetNode.position.y,
    );

    this.rectangleObject.setSize(
      targetNode.size.width,
      targetNode.size.height,
    );
  }
}