export interface IRange<T> {
  entries: T[];

  currentIndex: number;

  next(): T;

  isComplete(): boolean;
}