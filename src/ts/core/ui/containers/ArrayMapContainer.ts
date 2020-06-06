import { Container } from './Container';
import { IAlignmentStrategy } from './IAlignmentStrategy';
import { INode } from '../INode';
import { Direction } from '../Direction';

/**
 * 型 `T` のインスタンスを元にUIノードを生成するコールバック
 */
type UiNodeFactoryCallback<T> = (instance: T) => INode;

/**
 * @param T UIコンテナと対応させたいオブジェクト配列のオブジェクトの型 内部で `Array<T>` として扱われる
 */
export class ArrayMapContainer<T> extends Container {
  readonly arrayData: Array<T>;

  private currentStartIndex: number;
  private dataChunkSize: number;
  private uiNodeFactoryCallback: UiNodeFactoryCallback<T>;
  
  /**
   * 
   * @param arrayData UIコンテナの情報に紐付けるオブジェクトのデータ
   * @param wrapedContainer オブジェクト配列の情報に紐付けるUIコンテナ(newで生成されたばかりのコンテナ)
   * @param uiNodeFactoryCallback 指定オブジェクトのインスタンス情報を元にUIノードを生成する関数
   */
  constructor (
    arrayData: Array<T>,
    uiNodeFactoryCallback: UiNodeFactoryCallback<T>,
    alignmentStrategy: IAlignmentStrategy,
    maxNodes: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
  ) {
    super(alignmentStrategy, width, height, x, y, maxNodes);

    this.arrayData = arrayData; 
    this.uiNodeFactoryCallback = uiNodeFactoryCallback;
    this.currentStartIndex = -1;

    // arrayDataを元にchildrenを初期化
    this._initChildren();
  }
  
  /**
   * ArrayMapContainerは内部の操作でchildrenを操作するので外部からの操作は禁止
   * (内部ではsuper経由で呼べる)
   */
  pushNode(...node: INode[]): number {
    throw Error('illegal operation. ArrayMapContainer\'s "pushNode" can not be called from outside');
  }
  
  /**
   * ArrayMapContainerは内部の操作でchildrenを操作するので外部からの操作は禁止
   * (内部ではsuper経由で呼べる)
   */
  unshiftNode(...node: INode[]): number {
    throw Error('illegal operation. ArrayMapContainer\'s "unshiftNode" can not be called from outside');
  }

  /**
   * arrayData からデータを取り出してchildrenにノードを加える。
   * `slideSize` > 0 : childrenの次に続くノードをarrayDataから取り出して後ろに加える
   * `slideSize` < 0 : childrenの前にあるノードをarrayDataから取り出して前に加える
   * 
   * @param slideSize 
   */
  slideNode(slideSize: number): void {
    const targetIndex = (slideSize > 0) ?
      Math.min(this._getEndIndex(), this.arrayData.length):
      Math.max(0, this.currentStartIndex + slideSize);

    const startIndex = (slideSize > 0) ? this._getEndIndex() : this.currentStartIndex;
    
    slideSize = (slideSize > 0) ?
      targetIndex - this._getEndIndex():
      this.currentStartIndex - targetIndex;

    const addedData = this.arrayData.slice(startIndex, startIndex + slideSize);

    const addedNode = addedData.map((data: T) => (this.uiNodeFactoryCallback(data)));
    
    this.pushNode(...addedNode);
  }

  private _getEndIndex(): number {
    return this.currentStartIndex + this.children.length;
  }

  private _initChildren(): void {
    for (const data of this.arrayData) {
      const node = this.uiNodeFactoryCallback(data);

      this.pushNode(node);

      // コンテナがいっぱいになったらそこで終了
      if (this.children.length >= this.maxNodes) break;
    }
  }
}