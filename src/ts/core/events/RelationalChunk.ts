type BackPoint<T> = {chunk: RelationalChunk<T>, index: number};
type EventCallback<T> = (chunk: RelationalChunk<T>) => void;

export class RelationalChunk<T> {
  events: T[];
  currentIndex: number;
  backPoint: BackPoint<T>;

  private startCallback: EventCallback<T>;
  private completeCallback: EventCallback<T>;

  constructor(
    events?: T[],
    startCallback?: EventCallback<T>,
    completeCallback?: EventCallback<T>,
    backPoint?: BackPoint<T>,
  ) {
    this.events = events ? events : [];
    this.startCallback = startCallback ? startCallback : null;
    this.completeCallback = completeCallback ? completeCallback : null;
    this.backPoint = backPoint ? backPoint : null;
    this.currentIndex = -1;
  }

  next(): IteratorResult<T, T> {
    this.currentIndex++;
    const event = this.events[this.currentIndex];

    if (this.startCallback && (this.currentIndex === 0)) {
      this.startCallback(this);
    } else if (this.startCallback && (this.currentIndex === this.events.length)) {
      this.completeCallback(this);
    }

    return {value: event, done: this.isComplete()};
  }

  isComplete(): boolean {
    return !this.events[this.currentIndex + 1];
  }

  getRootChunk(): RelationalChunk<T> {
    return this.backPoint ? this.backPoint.chunk.getRootChunk() : this;
  }
}