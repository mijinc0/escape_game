import { Direction } from '../Direction';
import { IElement } from '../IElement';

export interface IAlignmentHandler {
  align(elements: IElement[], anchor?: IElement): void;

  getNextIndex(currentIndex: number, direction: Direction): number;
}