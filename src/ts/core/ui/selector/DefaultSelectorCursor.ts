import * as Phaser from 'phaser';
import * as Render from '../../renders';
import { Rectangle } from '../phaserObject/Rectangle';
import { ISelectorCursor } from './ISelectorCursor';
import { IElement } from '../IElement';

export class DefaultSelectorCursor implements ISelectorCursor {
  private cursorObject: Phaser.GameObjects.Rectangle & IElement;

  constructor(scene: Phaser.Scene) {
    this.cursorObject = new Rectangle(scene, 0, 0, 0, 0, 0xffffff, 0.2);

    Render.UiRenderOrder.selectorCursor(this.cursorObject);

    scene.add.existing(this.cursorObject);
  }

  get visible(): boolean {
    return this.cursorObject.visible;
  }

  set visible(v: boolean) {
    this.cursorObject.visible = v;
  }

  goTo(targetNode: IElement): void {
    this.cursorObject.anchor = targetNode;
    this.cursorObject.width = targetNode.width;
    this.cursorObject.height = targetNode.height;
  }

  destroy(fromScene?: boolean): void {
    this.cursorObject.destroy(fromScene);
  }
}
