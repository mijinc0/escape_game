import { ISelectorCursor } from './ISelectorCursor';
import { IElement } from '../IElement';
import { Direction } from '../Direction';
import { IGroup } from '../group/IGroup';

type RootGroupCancelEvent = () => void;

export interface ISelector {
  cursor: ISelectorCursor;
  
  update(frame?: number): void;

  /**
   * 
   * @param managedGroup セレクタが管理するグループ
   * @param destroyIfCanceled managedGroupのキャンセル時に削除するコンテナを指定
   */
  setGroup(managedGroup: IGroup, destroyIfCanceled?: IElement[]): void;

  goNext(direction: Direction): void;

  destroy(fromScene?: boolean): void;

  setRootCancelEvent(event: RootGroupCancelEvent): void;
}