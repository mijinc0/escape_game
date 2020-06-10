import { NodeSelector } from './NodeSelector';
import { INodeSelector } from './INodeSelector';
import { INode } from '../INode';
import { IContainer } from '../containers/IContainer';
import { Container } from '../containers/Container';
import { Keys } from '../../input/Keys';
import { ISelectorCursor } from './ISelectorCursor';

export class NodeSelectorFactory {
  static create(container: IContainer, cursor: ISelectorCursor, keys?: Keys): NodeSelector {
    const nodeSelector = new NodeSelector(container, cursor, keys);

    nodeSelector.addSelectEvent(this._changeManagementContainerToSelectedNode.bind(this));
    nodeSelector.addCancelEvent(this._changeManagementContainerToParentNode.bind(this));

    return nodeSelector;
  }

  /**
   * 選択決定したノードがその子供にContainerを持っていれば、そのノードへとセレクタが管理するコンテナノードを変更する
   * 
   * @param selectedNode 
   * @param nodeSelector 
   */
  private static _changeManagementContainerToSelectedNode(selectedNode: INode, nodeSelector: INodeSelector): void {
    const childContainer = selectedNode.children.find((node: INode) => (node instanceof Container));

    if (childContainer) {
      this._changeSelectorManagementContainer(childContainer, nodeSelector);
    }
  }

  /**
   * キャンセルされたノード(つまり現在nodeSelectorが管理中のコンテナ)が親を持っていれば、そのノードへとセレクタが管理するコンテナノードを変更する
   * 
   * @param currentNode 
   * @param nodeSelector 
   */
  private static _changeManagementContainerToParentNode(canceledNode: INode, nodeSelector: INodeSelector): void {
    if (canceledNode.parent) {
      this._changeSelectorManagementContainer(canceledNode.parent, nodeSelector);
    }
  }

  private static _changeSelectorManagementContainer(node: INode, nodeSelector: INodeSelector): void {
    if (node instanceof Container) {
      nodeSelector.setContainer(node);

    } else {
      console.warn('this node is not instance of Container');
    }
  }
}