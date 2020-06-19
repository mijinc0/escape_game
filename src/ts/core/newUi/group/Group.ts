import { IGroup } from './IGroup';
import { IAlignmentStrategy } from './IAlignmentStrategy';
import { Element } from '../Element';
import { IElement } from '../IElement';
import { Direction } from '../Direction';

export class Group extends Element implements IGroup {
  entries: IElement[];

  currentIndex: number;

  alignmentStrategy?: IAlignmentStrategy;

  constructor(dx = 0, dy = 0, width = 0, height = 0, anchor?: IElement, as?: IAlignmentStrategy) {
    super(dx, dy, width, height, anchor);

    this.alignmentStrategy = as ? as : null;
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
    if (this.alignmentStrategy) {
      this.alignmentStrategy.align(this.entries, this);
    } else {
      this._defaultAlignmentStarategy(this.entries);
    }
  }

  get(index: number): IElement|null {
    return this.entries[index] ? this.entries[index] : null;
  }

  getNext(direction: Direction): IElement|null {
    const nextIndex = this._getNextIndex(direction, true);
    const nextNode = this.get(nextIndex);

    if (!nextNode) return null;

    this.currentIndex = nextIndex;
    
    return nextNode;
  }

  getCurrent(): IElement|null {
    return this.get(this.currentIndex);
  }

  protected _getNextIndex(direction: Direction, limit = true): number {
    // currentIndex < 0 の時にgetNextをすると、次のindexはentriesの最初(0)を返す
    if (this.currentIndex < 0) return 0;

    const nextNodeIndex = this.alignmentStrategy ? this.alignmentStrategy.getNextIndex(this.currentIndex, direction) : this.currentIndex + 1;
    
    const overLimit = (nextNodeIndex < 0 || nextNodeIndex >= this.entries.length);
    // limitが設定されており、かつ取得したindexがchildrenに対して有効なindexでない(limitを超えている)場合にはcurrentIndexを返す
    return (limit && overLimit) ? this.currentIndex : nextNodeIndex;
  }

  private _defaultAlignmentStarategy(entries: IElement[]): void {
    entries.forEach((entry: IElement) => {
      entry.anchor = this;
    });
  }
}