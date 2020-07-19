import { IGroup } from './IGroup';
import { IAlignmentHandler } from './IAlignmentHandler';
import { Element } from '../Element';
import { IElement } from '../IElement';
import { Direction } from '../Direction';
import { MathUtil } from '../utils/MathUtil';

export class Group extends Element implements IGroup {
  entries: IElement[];

  currentIndex: number;

  alignmentHandler?: IAlignmentHandler;

  constructor(dx = 0, dy = 0, width = 0, height = 0, anchor?: IElement, ah?: IAlignmentHandler) {
    super(dx, dy, width, height, anchor);

    this.alignmentHandler = ah ? ah : null;
    this.entries = [];
    this.currentIndex = -1;
  }

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
    if (this.alignmentHandler) {
      this.alignmentHandler.align(this.entries, this);
    } else {
      this._defaultAlignmentHandler(this.entries);
    }
  }

  get(index: number): IElement | null {
    return this.entries[index] ? this.entries[index] : null;
  }

  getNext(direction: Direction): IElement | null {
    const nextIndex = this._getNextIndex(direction, true);
    const nextElement = this.get(nextIndex);

    if (!nextElement) return null;

    this.currentIndex = nextIndex;
    return nextElement;
  }

  getCurrent(): IElement | null {
    return this.get(this.currentIndex);
  }

  protected _getNextIndex(direction: Direction, limit = true): number {
    // currentIndex < 0 の時にgetNextをすると、次のindexはentriesの最初(0)を返す
    if (this.currentIndex < 0) return 0;

    const nextNodeIndex = this.alignmentHandler
      ? this.alignmentHandler.getNextIndex(this.currentIndex, direction)
      : this.currentIndex + 1;

    return limit ? MathUtil.clamp(nextNodeIndex, 0, this.entries.length - 1) : nextNodeIndex;
  }

  private _defaultAlignmentHandler(entries: IElement[]): void {
    entries.forEach((entry: IElement) => {
      entry.anchor = this;
    });
  }
}
