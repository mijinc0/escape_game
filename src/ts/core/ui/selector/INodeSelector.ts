import { IContainer } from '../containers/IContainer';
import { INode } from '../INode';
import { Element } from '../Element';
import { Keys } from '../../input/Keys';

type SelectNodeCallback = (targetNode: INode, nodeSelector: INodeSelector) => void;

export interface INodeSelector extends Element {
  keys: Keys;
 
  disable: boolean;

  setContainer(container: IContainer): void;

  addSelectEvent(event: SelectNodeCallback): void;
  
  addCancelEvent(event: SelectNodeCallback): void;
}