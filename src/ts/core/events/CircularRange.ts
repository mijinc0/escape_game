import { IRange } from './IRange';
import { MathUtil } from '../utils/MathUtil';

export class CircularRange<T> implements IRange<T> {
  entries: T[];
  currentIndex: number;

  constructor(elements?: T[]) {
    this.entries = elements ? elements : [];
    this.currentIndex = -1;
  }

  next(): T {
    // indexを回転させることでサークルにしている
    this.currentIndex = MathUtil.mod(this.currentIndex, this.entries.length);

    const element = this.entries[this.currentIndex];

    return element;
  }

  isComplete(): boolean {
    return false;
  }
}