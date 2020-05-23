type BackPoint<T> = {chunk: IRelationalChunk<T>, index: number};

export interface IRelationalChunk<T> {
  events: T[];

  currentIndex: number;
  
  backPoint: BackPoint<T>;

  next(): IteratorResult<T, T>;

  isComplete(): boolean;

  getRootChunk(): IRelationalChunk<T>;
}