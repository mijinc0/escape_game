import { IAlignmentStrategy } from './IAlignmentStrategy';
import { IElement } from '../IElement';
import { Direction } from '../Direction';

export interface IGroup {
  entries: IElement[];

  currentIndex: number;

  alignmentStrategy?: IAlignmentStrategy;

  destroy(fromScene?: boolean): void;

  push(...elements: IElement[]): number;

  unshift(...elements: IElement[]): number;

  align(): void;

  get(index: number): IElement|null;

  getNext(direction: Direction): IElement|null;

  getCurrent(): IElement|null;
}