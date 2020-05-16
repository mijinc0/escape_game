import { Element } from '../Element';
import { Node } from '../Node';

export interface ISelectorCursor extends Element {
  visible(): void;

  invisible(): void;

  on(targetNode: Node): void;
}