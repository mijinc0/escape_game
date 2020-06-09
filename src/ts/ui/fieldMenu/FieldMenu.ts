import * as Phaser from 'phaser';
import { Element } from '../../core/ui/Element';
import { Node } from '../../core/ui/Node';
import { INode } from '../../core/ui/INode';
import { ContainerFactory } from '../../core/ui/containers/ContainerFactory';
import { Container } from '../../core/ui/containers/Container';
import { NodeSelector } from '../../core/ui/selector/NodeSelector';
import { SelectorCursor } from '../../core/ui/objects/SelectorCursor';
import { Keys } from '../../core/input/Keys';

export class FieldMenu implements Element {
  private rootContainer: Container;
  private nodeSelector: NodeSelector; 

  constructor(scene: Phaser.Scene, keys?: Keys) {
    this.rootContainer = ContainerFactory.createRightRange(0, 0, 10);
    
    const selectorCursor = new SelectorCursor(scene);
    this.nodeSelector = new NodeSelector(this.rootContainer, selectorCursor, keys);
  }

  update(frame: number): void {
    this.nodeSelector.update(frame)
    this.rootContainer.update(frame);
  };

  destroy(): null {
    this.nodeSelector.destroy();
    this.rootContainer.destroy();

    return null;
  };

  addMenu(...menus: Node[]): void {
    this.rootContainer.pushNode(...menus);

    menus.forEach((menu: Node) => {
      this._addSelectEventIntoMenu(menu);
      this._addCancelEventIntoMenu(menu);
    });
  }

  private _addSelectEventIntoMenu(menu: Node): void {
    menu.addSelectEvent((() => {
      // メニューノードの子供の中から、コンテナノードを取得して、存在すればセレクターの管理しているコンテナノードを切り替える
      const container = menu.children.find((node: INode) => (node instanceof Container));

      if (container instanceof Container) {
        this.nodeSelector.setContainer(container);

      } else {
        console.warn('this menu has no container');
      }
    }).bind(this));
  }

  private _addCancelEventIntoMenu(menu: Node): void {
    menu.addCancelEvent((() => {
      // 自身の親ノードにセレクタが管理するコンテナノードを切り替える
      // 存在しない、またはコンテナノードでない場合は警告だけ出して何もしない
      const container = (menu.parent instanceof Container) ? menu.parent : null;
  
      if (container instanceof Container) {
        this.nodeSelector.setContainer(container);
  
      } else {
        console.warn('this node has no parent or parent node is not instance of Container');
      }
    }).bind(this));
  }
}