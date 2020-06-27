import { Group } from './Group';
import { IAlignmentHandler } from './IAlignmentHandler';
import { Direction } from '../Direction';
import { IElement } from '../IElement';
import { MathUtil } from '../utils/MathUtil';

type ElementFactoryCallback<T> = (instance: T) => IElement;

export class ScrollGroup<T> extends Group {
  maxSize: number;

  scrollSize: number;

  private startDataIndex: number;

  private data: T[];

  private elementFactoryCallback?: ElementFactoryCallback<T>;

  constructor(dx = 0, dy = 0, width = 0, height = 0, anchor?: IElement, ah?: IAlignmentHandler, maxSize?: number, scrollSize?: number) {
    super(dx, dy, width, height, anchor, ah);

    this.maxSize = maxSize ? maxSize : 1;
    this.scrollSize = scrollSize ? scrollSize : 1;
    this.startDataIndex = -1;
    this.data = [];
    this.elementFactoryCallback = null;
  }

  get endDataIndex(): number {
    if (this.entries.length === 0) return -1;

    return this.startDataIndex + this.entries.length - 1;
  }

  get currentSouceDataIndex(): number {
    if (this.entries.length === 0) return -1;

    return this.startDataIndex + this.currentIndex;
  }

  /**
   * NOTE: `push`及び`unshift`は基本的に外からは使わない
   * 
   * @param elements 
   */
  push(...elements: IElement[]): number {
    this.entries.push(...elements);

    // 頭からはみ出したElementsが押し出されて削除される
    if (this.maxSize > 0) {
      const entryiesSize = this.entries.length;
      const pushout = this.entries.splice(0, (entryiesSize - this.maxSize));

      pushout.forEach((element: IElement) => {element.destroy()});
    }

    this.align();
    return this.entries.length;
  }

  /**
   * NOTE: `push`及び`unshift`は基本的に外からは使わない
   * 
   * @param elements 
   */
  unshift(...elements: IElement[]): number {
    this.entries.unshift(...elements);

    // 末尾からはみ出したElementsが押し出されて削除される
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

  getNext(direction: Direction): IElement|null {
    if (this.data.length === 0) return null;

    // 1. 次のElementのindexを取得する
    //    この時、`limit=false`になているので現在のentriesとして不正のindexも返ってくる
    let nextIndex = this._getNextIndex(direction, false);
    const nextElement = this.get(nextIndex);

    // 2. 現在のentries内で取得できた場合はそれを返して終了
    if (nextElement) {
      this.currentIndex = nextIndex;
      return nextElement;
    };

    // 3. 現在のentries内では取得出来なかった場合は`data`からElementを生成、追加した後にもう一度取得を試みる
    if (nextIndex < 0) {
      // `nextIndex < 0`の場合、現在のentriesに対して"前の"データが不足していることになるので
      // `_scrollupEntries`を使ってentriesの内容をスクロールさせ、前方に補充されたElementの数だけcurrentIndexを増やす
      const lackingDataSize = Math.abs(nextIndex);
      const dataScrollCount = Math.ceil(lackingDataSize / this.scrollSize);
      const unshiftedElementSize = this._scrollupEntries(dataScrollCount);
      this.startDataIndex -= unshiftedElementSize;
      this.currentIndex += unshiftedElementSize;

    } else {
      // `nextIndex >= 0`の場合、現在のentriesに対して"後ろの"データが不足していることになるので
      // `_scrolldownEntries`を使ってentriesの内容をスクロールさせ、後方に補充されたElementの数だけcurrentIndexを減らす
      const lackingDataSize = Math.abs(nextIndex - this.entries.length - 1);
      const dataScrollCount = Math.ceil(lackingDataSize / this.scrollSize);
      const unshiftedElementSize = this._scrolldownEntries(dataScrollCount);
      this.startDataIndex += unshiftedElementSize;
      this.currentIndex -= unshiftedElementSize;
    }

    // 4. entriesの内容とcurrentIndexをスクロールした状態で、再度次のindexを取得する
    //    ここで取れなかった場合はdataの範囲からもはみ出したことを意味するので、indexをclampさせる
    nextIndex = this._getNextIndex(direction, false);
    nextIndex = MathUtil.clamp(nextIndex, 0, this.entries.length - 1);
    this.currentIndex = nextIndex;
    return this.get(nextIndex);
  }

  private _initGroup(): void {
    if (!this.elementFactoryCallback) {
      throw Error('ArrayMapGroup has no elementFactoryCallback???');
    }
    
    const initEntries: IElement[] = [];

    const initSize = Math.min(this.maxSize, this.data.length);
    this._pushElementFromDataToEntriesTail(initSize);

    if (this.entries.length > 0) {
      this.startDataIndex = 0;
    }

    this.push(...initEntries);
  }

  /**
   * entriesの頭に`count * this.scrollSize`分の要素を`this.data`からElementsを生成してunshiftする
   * (indexが0を下回った分はclampされる)
   * 
   * @param count 
   */
  private _scrollupEntries(count: number): number {
    const unshiftedEntries = count * this.scrollSize;
    return this._unshiftElementFromDataToEntriesHead(unshiftedEntries);
  }

  /**
   * entriesの末尾に`count * this.scrollSize`分の要素を`this.data`からElementsを生成してpushする
   * (this.dataを超過した分はclampされる)
   * 
   * @param count 
   */
  private _scrolldownEntries(count: number): number {
    const pushedEntries = count * this.scrollSize;
    return this._pushElementFromDataToEntriesTail(pushedEntries);
  }

  private _pushElementFromDataToEntriesTail(size: number): number {
    // Math.maxを入れるのは`startDataIndex===-1 && entries.length===0 (初期状態)`のときのため
    const startIndex = Math.max(0, this.startDataIndex + this.entries.length);
    const endIndex = startIndex + size;

    return this._pushElementsFromData(startIndex, endIndex);
  }

  private _unshiftElementFromDataToEntriesHead(size: number): number {
    const endIndex = this.startDataIndex;
    const startIndex = Math.max(0, endIndex - size);

    return this._unshiftElementsFromData(startIndex, endIndex);
  }

  private _pushElementsFromData(startIndex: number, endIndex: number): number {
    const elements = this._createElementsFromData(startIndex, endIndex);
    this.push(...elements);
    return elements.length;
  }

  private _unshiftElementsFromData(startIndex: number, endIndex: number): number {
    const elements = this._createElementsFromData(startIndex, endIndex);
    this.unshift(...elements);
    return elements.length;
  }

  private _createElementsFromData(startIndex: number, endIndex: number): IElement[] {
    if (startIndex > endIndex) {
      throw Error('start index must be greater than endIndex');
    }

    const data = this.data.slice(startIndex, endIndex);

    return data.map((d: T) => (this._createElementFromData(d)));
  }

  private _createElementFromData(data: T): IElement {
    return this.elementFactoryCallback(data);
  }
}