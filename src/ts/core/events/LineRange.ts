import { IRange } from './IRange';

export class LineRange<T> implements IRange<T> {
  entries: T[];
  currentIndex: number;

  constructor(elements?: T[]) {
    this.entries = elements ? elements : [];
    this.currentIndex = -1;
  }

  next(): T {
    this.currentIndex++;

    const element = this.entries[this.currentIndex];

    return element;
  }

  isComplete(): boolean {
    return !this.entries[this.currentIndex + 1];
  }
}