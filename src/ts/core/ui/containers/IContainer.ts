import { INode } from '../INode';
import { Direction } from '../Direction';

export interface IContainer extends INode {
  maxNodes: number;

  currentIndex: number;

  getCurrent(): INode|null;

  getNext(direction: Direction): INode|null;

  alignNodes(): void;
}