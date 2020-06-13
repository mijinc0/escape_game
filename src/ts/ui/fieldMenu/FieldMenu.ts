import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import { Keys } from '../../core/input/Keys';

export class FieldMenu implements Ui.Element {
  isClosed: boolean;
  
  private rootNode: Ui.RootNode;
  private rootContainer: Ui.Container;
  private nodeSelector: Ui.NodeSelector;

  constructor(scene: Phaser.Scene, x: number, y: number, keys?: Keys) {
    this.isClosed = false;

    this.rootNode = new Ui.RootNode();
    this.rootContainer = this._createRootContainer(scene, x, y);
    this.nodeSelector = this._createNodeSelector(scene, keys);

    this.rootNode.pushNode(this.rootContainer);
    this.nodeSelector.setContainer(this.rootContainer);
  }

  update(frame: number): void {
    if (this.isClosed) return;

    this.nodeSelector.update(frame)
    this.rootNode.update(frame);
  };

  destroy(): null {
    this.nodeSelector = this.nodeSelector.destroy();
    this.rootNode = this.rootNode.destroy();

    return null;
  };

  addMenu(...menus: Ui.Node[]): void {
    this.rootContainer.pushNode(...menus);
  }

  private _createRootContainer(scene: Phaser.Scene, x: number, y: number): Ui.Container {
    const rootContainer = Ui.ContainerFactory.createRightRange(10, x, y);

    // rootContainerがキャンセルされると、フィールドメニューを閉じるフラグを立てる
    rootContainer.addCancelEvent((() => {
      this.isClosed = true;
    }).bind(this));
    
    return rootContainer;
  }

  private _createNodeSelector(scene: Phaser.Scene, keys?: Keys): Ui.NodeSelector {
    const selectorCursor = new Ui.SelectorCursor(scene);
    return Ui.NodeSelectorFactory.create(selectorCursor, keys, null);
  }
}