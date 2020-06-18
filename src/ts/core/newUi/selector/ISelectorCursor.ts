import { IElement } from '../IElement';

export interface ISelectorCursor extends IElement {
  visible(): void;

  invisible(): void;

  goTo(targetNode: IElement): void;
}