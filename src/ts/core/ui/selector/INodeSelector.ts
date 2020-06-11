import { ISelectorCursor } from './ISelectorCursor';
import { IContainer } from '../containers/IContainer';
import { INode } from '../INode';
import { Element } from '../Element';
import { Direction } from '../Direction';
import { Keys } from '../../input/Keys';

type SelectNodeCallback = (targetNode: INode, nodeSelector: INodeSelector) => void;

export interface INodeSelector extends Element {
  keys: Keys;
 
  disable: boolean;

  cursor: ISelectorCursor;

  setContainer(container: IContainer, destroy?: boolean): void;

  goNext(direction: Direction): void;

  addSelectEvent(event: SelectNodeCallback): void;
  
  addCancelEvent(event: SelectNodeCallback): void;
}