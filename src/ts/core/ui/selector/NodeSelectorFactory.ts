import { NodeSelector } from './NodeSelector';
import { INodeSelector } from './INodeSelector';
import { Direction } from '../Direction';
import { INode } from '../INode';
import { IContainer } from '../containers/IContainer';
import { Container } from '../containers/Container';
import { Keys } from '../../input/Keys';
import { ISelectorCursor } from './ISelectorCursor';

export class NodeSelectorFactory {
  static create(container: IContainer, cursor: ISelectorCursor, keys?: Keys): NodeSelector {
    const nodeSelector = new NodeSelector(container, cursor, keys);

    nodeSelector.addSelectEvent(this._goToSelectedNodeIfItHasContainer.bind(this));
    nodeSelector.addCancelEvent(this._goToAncestorContainer.bind(this));

    return nodeSelector;
  }

  /**
   * 選択決定したノードがその子供にContainerを持っていれば、そのノードへとセレクタが管理するコンテナノードを変更する
   * 
   * @param selectedNode 
   * @param nodeSelector 
   */
  private static _goToSelectedNodeIfItHasContainer(selectedNode: INode, nodeSelector: INodeSelector): void {
    const childContainer = selectedNode.children.find((node: INode) => (node instanceof Container));

    if (childContainer instanceof Container) {
      this._changeSelectorManagementContainer(childContainer, nodeSelector);
    }
  }

  /**
   * キャンセルされたノード(つまり現在nodeSelectorが管理中のコンテナ)の祖先ノードに
   * コンテナノードが存在していれば、そのノードへとセレクタが管理するコンテナノードを変更する
   * (親ノードではなく、祖先ノードとするのは、コンテナノードの直接の親がButtonノードだったりするため)
   * 
   * @param canceledContainer
   * @param nodeSelector 
   */
  private static _goToAncestorContainer(canceledContainer: INode, nodeSelector: INodeSelector): void {
    const containerNode = this._findContainerNodeFromAncestors(canceledContainer);

    if (containerNode) {
      this._changeSelectorManagementContainer(containerNode, nodeSelector);
    }
  }

  private static _findContainerNodeFromAncestors(node: INode): Container|null {
    if (!node.parent) return null;

    return (node.parent instanceof Container) ? node.parent : this._findContainerNodeFromAncestors(node.parent);
  }

  private static _changeSelectorManagementContainer(containerNode: Container, nodeSelector: INodeSelector): void {
    nodeSelector.setContainer(containerNode);
    // 一旦カーソルをoffにした後、goNextで(可能であれば)最初のノード選択状態とする
    nodeSelector.cursor.off();
    nodeSelector.goNext(Direction.Down);
  }
}