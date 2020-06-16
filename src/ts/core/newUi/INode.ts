export class INode {
  parent: INode;
  children: INode[];

  constructor() {
    this.parent = null;
    this.children = [];
  }
}