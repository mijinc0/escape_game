/**
 * データバインディングを確認するので一旦保留
 */
import { Group } from './Group';
import { IAlignmentStrategy } from './IAlignmentStrategy';
import { IElement } from '../IElement';

type ElementFactoryCallback<T> = (instance: T) => IElement;

export class ArrayMapGroup<T> extends Group {
  maxSize: number;

  private data: T[];

  private elementFactoryCallback?: ElementFactoryCallback<T>;

  constructor(dx = 0, dy = 0, width = 0, height = 0, anchor?: IElement, as?: IAlignmentStrategy, maxSize?: number) {
    super(dx, dy, width, height, anchor, as);

    this.maxSize = maxSize ? maxSize : -1;
    this.data = [];
    this.elementFactoryCallback = null;
  }

  push(...elements: IElement[]): number {
    this.entries.push(...elements);

    // 前を押し出す
    if (this.maxSize > 0) {
      const entryiesSize = this.entries.length;
      const pushout = this.entries.splice(0, (entryiesSize - this.maxSize));
      pushout.forEach((element: IElement) => {element.destroy()});
    }

    this.align();
    return this.entries.length;
  }

  unshift(...elements: IElement[]): number {
    this.entries.unshift(...elements);

    // 後ろを押し出す
    if (this.maxSize > 0) {
      const pushout = this.entries.splice(this.maxSize);
      pushout.forEach((element: IElement) => {element.destroy()});
    }

    this.align();
    return this.entries.length;
  }

  setData(data: T[], elementFactoryCallback: ElementFactoryCallback<T>): void {
    if (this.data.length) {
      throw Error('this ArrayMapGroup already has data');
    }

    this.data = data;
    this.elementFactoryCallback = elementFactoryCallback;

    this._initGroup();
  }

  private _initGroup(): void {
    if (!this.elementFactoryCallback) {
      throw Error('ArrayMapGroup has no elementFactoryCallback???');
    }
    
    const initEntries: IElement[] = [];

    for (const source of this.data) {
      const element = this.elementFactoryCallback(source);
      
      initEntries.push(element);
      
      // コンテナがいっぱいになったらそこで終了
      if (this.entries.length >= this.maxSize) break;
    }

    this.push(...initEntries);
  }
}