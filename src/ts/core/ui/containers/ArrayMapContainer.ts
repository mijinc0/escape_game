import { Container } from './Container';
import { IAlignmentStrategy } from './IAlignmentStrategy';
import { INode } from '../INode';
import { Direction } from '../Direction';
import { MathUtil } from '../utils/MathUtil';

/**
 * 型 `T` のインスタンスを元にUIノードを生成するコールバック
 */
type UiNodeFactoryCallback<T> = (instance: T) => INode;

/**
 * @param T UIコンテナと対応させたいオブジェクト配列のオブジェクトの型 内部で `Array<T>` として扱われる
 */
export class ArrayMapContainer<T> extends Container {
  readonly arrayData: Array<T>;

  private dataAddingSize: number;
  private uiNodeFactoryCallback: UiNodeFactoryCallback<T>;
  
  /**
   * 
   * @param arrayData UIコンテナの情報に紐付けるオブジェクトのデータ
   * @param uiNodeFactoryCallback 指定オブジェクトのインスタンス情報を元にUIノードを生成する関数
   *
   */
  constructor (
    arrayData: Array<T>,
    uiNodeFactoryCallback: UiNodeFactoryCallback<T>,
    alignmentStrategy: IAlignmentStrategy,
    dataAddingSize: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    maxNodes = 10,
  ) {
    super(alignmentStrategy, x, y, width, height, maxNodes);

    this.arrayData = arrayData; 
    this.uiNodeFactoryCallback = uiNodeFactoryCallback;
    this.dataAddingSize = dataAddingSize;

    // arrayDataを元にchildrenを初期化
    this._initChildren();
  }
  
  /**
   * ArrayMapContainerは内部の操作でchildrenを操作するので外部からの操作は禁止
   */
  pushNode(...node: INode[]): number {
    throw Error('illegal operation. ArrayMapContainer\'s "pushNode" can not be called from outside');
  }
  
  /**
   * ArrayMapContainerは内部の操作でchildrenを操作するので外部からの操作は禁止
   */
  unshiftNode(...node: INode[]): number {
    throw Error('illegal operation. ArrayMapContainer\'s "unshiftNode" can not be called from outside');
  }

  getNext(direction: Direction): INode {
    let nextIndex = this._getNextIndex(direction, false);
    let nextNode = this._get(nextIndex);

    // 1.現在のchildren内で取得できた場合
    // - children内で取得できればそれを返して終了
    if (nextNode) {      
      this.currentIndex = nextIndex;
      return nextNode;
    } 

    // 2.現在のchildren内で取得できなかった場合
    // - children内で取得できない場合、arrayDataからノードを生成して追加、取得を試みる
    // - `nextIndex > 0`であれば現在のchildrenに続くノードをarrayDataをもとに生成して追加、
    // - `nextIndex < 0`であれば現在のchildrenより前のノードをarrayDataをもとに生成して追加、
    // - 追加後、インデックスを追加前に指していたノードの位置へ移動する
    if (nextIndex > 0) {
      // `nextIndex > 0`の時、不足ノード数は次のインデックスとchildrenの終端ノードのインデックスの差
      const shortageNodeSize = nextIndex - (this.children.length - 1);
      const pushSize = this._pushNewNodesFromArrayData(shortageNodeSize);
      this.currentIndex -= pushSize;

    } else {
      // `nextIndex < 0`の時、不足ノード数は次のインデックスの絶対値
      const shortageNodeSize = Math.abs(nextIndex);
      const unshiftSize = this._unshiftNewNodesFromArrayData(shortageNodeSize);
      this.currentIndex += unshiftSize;
    }
    
    // この状態で、再び次のインデックスを取得する。
    // 上記の処理でノードが追加されてインデックスを調整しているので、次は取得できる可能性がある
    nextIndex = this._getNextIndex(direction, false);
    // まだ、arrayDataの配列の端に到達した時に、インデックスが飛び出してしまう可能性が残るため、クランプする
    nextIndex = MathUtil.clamp(nextIndex, 0, (this.children.length - 1));
    
    // インデックスを移動して、取得する
    this.currentIndex = nextIndex;
    return this.getCurrent();
  }

  private _createNodeFromData(data: T): INode {
    const node = this.uiNodeFactoryCallback(data);    
    // 後からどのオブジェクトから生成したノードなのか分かるように情報を入れておく
    node.customProperties.set('sourceObject', data);
    return node;
  }

  /**
   * 
   * @param size
   * @return number この操作によって実際に追加されたノードの数
   */
  private _pushNewNodesFromArrayData(size: number): number {
    if (size === 0 || this.children.length === 0) return 0;

    size = this._paddingAddedNodeSize(size);

    const lastChildIndex = this.children.length - 1;
    // このインデックスがarrayDataからノードを生成して追加していく基準になる
    const sourceObjectIndex = this._getSourceObjectIndexByChildNodeIndex(lastChildIndex);

    // 外部からarrayDataが操作されるなどしてsourceObjectがarrayDataに含まれていない場合(-1が返る)は警告を出して終了
    if (sourceObjectIndex < 0) {
      console.warn('illegal sorce object. object is not included in arrayData');
      return 0;  
    }

    // 新しいノード生成の開始に使うarrayDataのインデックスの範囲を決める
    const startNextSourceIndex = sourceObjectIndex + 1;
    const endNextSourceIndex = startNextSourceIndex + size;

    const addedNodes = this._createNodesByArrayDataIndex(startNextSourceIndex, endNextSourceIndex);

    // this.pushNodeは禁止されているのでsuperでアクセス
    super.pushNode(...addedNodes);

    return addedNodes.length;
  }

  /**
   * 
   * @param size
   * @return number この操作によって実際に追加されたノードの数
   */
  private _unshiftNewNodesFromArrayData(size: number): number {
    if (size === 0 || this.children.length === 0) return 0;

    size = this._paddingAddedNodeSize(size);

    // このインデックスがarrayDataからノードを生成して追加していく基準になる
    const sourceObjectIndex = this._getSourceObjectIndexByChildNodeIndex(0);

    // 外部からarrayDataが操作されるなどしてsourceObjectがarrayDataに含まれていない場合(-1が返る)は警告を出して終了
    if (sourceObjectIndex < 0) {
      console.warn('illegal sorce object. object is not included in arrayData');
      return 0;  
    }

    // 新しいノード生成の開始に使うarrayDataのインデックスの範囲を決める
    const endNextSourceIndex = sourceObjectIndex;
    const startNextSourceIndex = endNextSourceIndex - size;

    const addedNodes = this._createNodesByArrayDataIndex(startNextSourceIndex, endNextSourceIndex);

    // this.unshiftNodeは禁止されているのでsuperでアクセス
    super.unshiftNode(...addedNodes);

    return addedNodes.length;
  }

  /**
   * arrayDataからノードを追加する時、指定のサイズに完全に従ってノードを追加するのではなく、
   * `this.dataAddingSize`単位でデータを追加する。これは、テーブルをスクロールさせるような
   * 挙動をさせたい時に、指定サイズに従ってしまうとノードの数が半端な行(または列)が生まれてしまうのを防ぐため
   * (e.g.)
   * 一行5個のノードが並ぶコンテナにおいて、一行スクロールさせたい場合に5こ単位で追加させないといけない
   * 
   * @param size 指定のサイズ
   */
  private _paddingAddedNodeSize(size: number): number {
    const fraction = size & this.dataAddingSize;

    if (fraction === 0) return size;

    // 余りがあった場合、`dataAddingSize`に対してキリの良い数字に整える
    const k = Math.ceil(size / this.dataAddingSize);
    return this.dataAddingSize * k;
  }

  private _getSourceObjectIndexByChildNodeIndex(childNodeIndex: number): number {
    const childNode = this.children[childNodeIndex];
    const sourceObject = childNode.customProperties.get('sourceObject');

    // 外部からchildrenが操作されるなどしてsourceObjectが無いノードが出てきた場合は警告を出して-1を返す
    if (!sourceObject) {
      console.warn('illegal node. node does not have prop "sourceObject"');
      return -1;
    }

    return this.arrayData.indexOf(sourceObject);
  }

  /**
   * 
   * @param startIndex 開始のインデックス
   * @param endIndex 終了のインデックス (startIndex < endIndex) このインデックスは実際に生成する範囲に含めない
   */
  private _createNodesByArrayDataIndex(startIndex: number, endIndex: number): INode[] {
    // 無効なインデックスの場合は空配列を返す
    if (startIndex < 0 || startIndex > endIndex || endIndex > this.arrayData.length) {
      return [];
    }

    const sourceObjects = this.arrayData.slice(startIndex, endIndex);
    const nodes = sourceObjects.map((sourceObject: T) => (
      this.uiNodeFactoryCallback(sourceObject)
    ));

    return nodes;
  }

  private _initChildren(): void {
    for (const data of this.arrayData) {
      const node = this._createNodeFromData(data);

      super.pushNode(node);

      // コンテナがいっぱいになったらそこで終了
      if (this.children.length >= this.maxNodes) break;
    }
  }
}