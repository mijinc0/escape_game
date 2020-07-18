import { IElement } from '../IElement';

export interface ISelectorCursor {
  visible: boolean;

  goTo(targetNode: IElement): void;

  destroy(fromScene?: boolean): void;
}
