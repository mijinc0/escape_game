import { INode } from './INode';
import { Node } from './Node';

export class RootNode extends Node {
  update(frame?: number): void {
    if (!this.isDirty()) return;

    // updateする前に、Destroyされたものがツリーに残っていると邪魔なので最初に削除する
    this.removeDestroyedFromTree();

    this.children.forEach((child: INode) => {
      if (child.isDirty()) {
        child.update(frame);
      }
    });
  }
}