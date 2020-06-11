import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { Keys } from '../../core/input/Keys';

export class FieldMenu implements Ui.Element {
  isClosed: boolean;
  
  private rootContainer: Ui.Container;
  private nodeSelector: Ui.NodeSelector;

  constructor(scene: Phaser.Scene, x: number, y: number, keys?: Keys) {
    this.isClosed = false;

    this.rootContainer = Ui.ContainerFactory.createRightRange(10, x, y);
    
    const selectorCursor = new Ui.SelectorCursor(scene);
    this.nodeSelector = Ui.NodeSelectorFactory.create(this.rootContainer, selectorCursor, keys);
  }

  update(frame: number): void {
    if (this.isClosed) return;

    this.nodeSelector.update(frame)
    this.rootContainer.update(frame);
  };

  destroy(): null {
    this.nodeSelector = this.nodeSelector.destroy();
    this.rootContainer = this.rootContainer.destroy();

    return null;
  };

  addMenu(...menus: Ui.Node[]): void {
    this.rootContainer.pushNode(...menus);
  }
}