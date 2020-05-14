import { Node } from '../Node';
import { Direction } from '../Direction';

export interface IAlignmentStrategy {
  align(parentNode: Node): void;

  /**
   * 
   * @param index 
   * @param direction 
   */
  getNextNodeIndex(index: number, direction: Direction): number;
}