import { Node } from '../Node';
import { Direction } from '../Direction';

export interface IAlignmentStrategy {
  /**
   * 親のノード(コンテナ)の位置情報を元に、子ノードを変更、整列させる
   * 
   * @param parentNode 
   */
  align(parentNode: Node): void;

  /**
   * 起点と移動したい方向を指定して、移動先のノードは序列の中でどのノードなのかをインデックスを取得できる
   * 
   * @param index 起点となるインデックス 
   * @param direction 起点となるインデックスから"どの方向に向かって次"なのか
   */
  getNextNodeIndex(index: number, direction: Direction): number;
}