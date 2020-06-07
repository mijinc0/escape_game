import { IContainer } from '../containers/IContainer';
import { Element } from '../Element';
import { Keys } from '../../input/Keys';

export interface INodeSelector extends Element {
  keys: Keys;
 
  disable: boolean;

  setContainer(container: IContainer): void;
}