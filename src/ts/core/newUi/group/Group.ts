import { IAlignmentStrategy } from './IAlignmentStrategy';
import { Element } from '../Element';
import { IElement } from '../IElement';
import { Direction } from '../Direction';

export class Group extends Element implements IElement {
  entries: IElement[];

  currentIndex: number;

  alignmentStrategy?: IAlignmentStrategy;

  destroy(fromScene?: boolean): void {
    this.entries.forEach((element: IElement) => {
      element.destroy(fromScene);
    });
  }

  push(...elements: IElement[]): number {
    this.entries.push(...elements);
    this.align();
    return this.entries.length;
  }

  unshift(...elements: IElement[]): number {
    this.entries.unshift(...elements);
    this.align();
    return this.entries.length;
  }

  align(): void {
    if (this.alignmentStrategy) {
      this.alignmentStrategy.align(this.entries, this);
    }
  }

  get(index: number): IElement|null {
    return this.entries[index] ? this.entries[index] : null;
  }
  
  getNextIndex(direction: Direction): number {
    return this.alignmentStrategy ?
      this.alignmentStrategy.getNextIndex(this.currentIndex, direction) :
      this.currentIndex + 1;
  }

  getNext(direction: Direction): IElement|null {
    const nextIndex = this.getNextIndex(direction);
    return this.get(nextIndex);
  }

  getCurrent(): IElement|null {
    return this.get(this.currentIndex);
  }
}