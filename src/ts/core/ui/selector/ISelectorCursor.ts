import { Element } from '../Element';
import { INode } from '../INode';

export interface ISelectorCursor extends Element {
  visible(): void;

  invisible(): void;

  on(targetNode: INode): void;

  off(): void;
}