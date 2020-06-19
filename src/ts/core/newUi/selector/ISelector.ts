import { ISelectorCursor } from './ISelectorCursor';
import { IElement } from '../IElement';
import { IGroup } from '../group/IGroup';

export interface ISelector {
  cursor: ISelectorCursor;
  
  update(frame?: number): void;

  /**
   * 
   * @param managedGroup セレクタが管理するグループ
   * @param destroyIfCanceled managedGroupのキャンセル時に削除するコンテナを指定
   */
  setGroup(managedGroup: IGroup, destroyIfCanceled?: IElement[]): void;

  destroy(fromScene?: boolean): void;
}