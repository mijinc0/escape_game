import { Direction } from '../Direction';
import { IElement } from '../IElement';

export interface IAlignmentStrategy {
  align(elements: IElement[], anchor?: IElement): void;

  getNextIndex(currentIndex: number, direction: Direction): number;
}