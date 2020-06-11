import * as Phaser from 'phaser';
import { Element } from '../../core/ui/Element';
import { Node } from '../../core/ui/Node';
import { ContainerFactory } from '../../core/ui/containers/ContainerFactory';
import { Container } from '../../core/ui/containers/Container';
import { NodeSelector } from '../../core/ui/selector/NodeSelector';
import { NodeSelectorFactory } from '../../core/ui/selector/NodeSelectorFactory';
import { SelectorCursor } from '../../core/ui/objects/SelectorCursor';
import { Keys } from '../../core/input/Keys';

export class FieldMenu implements Element {
  isClosed: boolean;
  
  private rootContainer: Container;
  private nodeSelector: NodeSelector;

  constructor(scene: Phaser.Scene, x: number, y: number, keys?: Keys) {
    this.isClosed = false;

    this.rootContainer = ContainerFactory.createRightRange(10, x, y, 200, 200);
    
    this.rootContainer.addCancelEvent((() => {
      this.isClosed = true;
    }).bind(this));
    
    const selectorCursor = new SelectorCursor(scene);
    this.nodeSelector = NodeSelectorFactory.create(this.rootContainer, selectorCursor, keys);
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

  addMenu(...menus: Node[]): void {
    this.rootContainer.pushNode(...menus);
  }
}