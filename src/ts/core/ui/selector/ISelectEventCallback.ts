import { ISelector } from './ISelector';
import { IElement } from '../IElement';

/**
 * `Selector._select()`によってIElement, ISelector双方で発火するコールバックの型。
 * 実際はEventEmiterを使っているのでコールバックの引数は`any[]`だが
 * 他のところで使うことも多いのでインターフェースにしてexportしておく
 */
export interface ISelectEventCallback {
  (element: IElement, selector: ISelector): void;
}
