import { Node } from '../Node';

export interface ISelectorCursor {
  visible(): void;

  invisible(): void;

  on(targetNode: Node): void;
}