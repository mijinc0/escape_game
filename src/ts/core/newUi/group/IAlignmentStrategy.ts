import { Direction } from '../Direction';
import { ITransfrom } from '../ITransfrom';

export interface IAlignmentStrategy {
  align(transformObjects: ITransfrom[], anchor?: ITransfrom): void;

  getNextIndex(currentIndex: number, direction: Direction): number;
}