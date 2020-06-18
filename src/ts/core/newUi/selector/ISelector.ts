import { IGroup } from '../group/IGroup';

export interface ISelector {
  update(frame?: number): void;

  /**
   * 
   * @param managedGroup セレクタが管理するグループ
   * @param destroyIfCanceled managedGroupのキャンセル時に削除するコンテナを指定
   */
  setGroup(managedGroup: IGroup, destroyIfCanceled?: IGroup[]): void;

  destroy(fromScene?: boolean): void;
}