import { Container } from '../containers/Container';
import { Element } from '../Element';
import { Keys } from '../../input/Keys';

export interface INodeSelector extends Element {
  keys: Keys;
 
  disable: boolean;

  setContainer(container: Container): void;
}