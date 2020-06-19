import { Direction } from '../Direction';
import { IElement } from '../IElement';

export interface IAlignmentStrategy {
  align(transformObjects: IElement[], anchor?: IElement): void;

  getNextIndex(currentIndex: number, direction: Direction): number;
}