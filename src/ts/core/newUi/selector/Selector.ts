import { ISelector } from './ISelector';
import { ISelectorCursor } from './ISelectorCursor';
import { SelectorEventNames } from './SelectorEventNames';
import { Direction } from '../Direction';
import { IGroup } from '../group/IGroup';
import { Keys } from '../../input/Keys';

type GroupHistoryEntry = {
  group: IGroup,
  destroyIfCanceled: IGroup[],
};

export class Selector implements ISelector {
  cursor: ISelectorCursor;
  disable: boolean;
  
  keys?: Keys;
  
  private groupHistory: GroupHistoryEntry[];
  // 入力イベント後、次に入力を受け付けるまでのクールタイム(フレーム数:厳密にはupdateが呼ばれた回数)
  private cooldownTime: number;
  private cooldownCount: number;

  constructor(cursor: ISelectorCursor, keys?: Keys) {
    this.cursor = cursor;
    this.disable = false;
    this.keys = keys ? keys : null;
    this.groupHistory = [];
    this.cooldownTime = 16;
    this.cooldownCount = 0;
  }

  update(frame?: number): void {
    const currentGoup = this._getCurrentGroup();

    if (!this.keys || !currentGoup || this.disable) return;

    // 毎フレームキーの入力を受け付けるとセレクタが高速で移動しすぎるので、
    // クールダウンタイムを設けて0の時以外は操作を受け付けなくする
    this.cooldownCount = Math.max(0, this.cooldownCount - 1);
    if (this.cooldownCount != 0) return;

    // 各キーを押した時の操作
    if (this.keys.cursors.down.isDown) {
      this.goNext(Direction.Down);

    } else if (this.keys.cursors.right.isDown) {
      this.goNext(Direction.Right);
    
    } else if (this.keys.cursors.left.isDown) {
      this.goNext(Direction.Left);
    
    } else if (this.keys.cursors.up.isDown) {
      this.goNext(Direction.Up);

    } else if (this.keys.action.isDown) {
      this._select();

    }　else if (this.keys.cancel.isDown) {
      this._cancel();
    }　
  }

  setGroup(managedGroup: IGroup, destroyIfCanceled?: IGroup[]): void {
    // historyの先頭に加える
    this.groupHistory.unshift({
      group: managedGroup,
      destroyIfCanceled: destroyIfCanceled ? destroyIfCanceled : [],
    });
  }

  destroy(fromScene?: boolean): void {
    this.cursor.destroy(fromScene);
  }

  goNext(direction: Direction): void {
    const currentGrup = this._getCurrentGroup();

    if (!currentGrup) return;

    const current = currentGrup.getCurrent();
    const next = currentGrup.getNext(direction);
      
    // 次のノードが無ければ即return 何もしない
    if (!next) return;

    if (current) {
      current.emit(SelectorEventNames.Out, current, this);
    }

console.log(`next {x: ${next.x}, y: ${next.y}}`);

    // カーソルを移動させる
    this.cursor.goTo(next);
    next.emit(SelectorEventNames.Over, next, this);

    // クールダウンを設定して終了
    this._setCooldownTime();
  }

  private _getCurrentGroup(): IGroup|null {
    return this.groupHistory[0] ? this.groupHistory[0].group : null;
  }

  private _setCooldownTime(): void {
    this.cooldownCount = this.cooldownTime;
  }

  private _select(): void {
    const currentGroup = this._getCurrentGroup();
    if (!currentGroup) return;

    const currentElement = currentGroup.getCurrent();
    if (!currentElement) return;

    currentElement.emit(SelectorEventNames.Select, currentElement);
  
    this._setCooldownTime();
  }

  private _cancel(): void {
    const currentGroupEntry = this.groupHistory.shift();

    if (!currentGroupEntry) return;

    currentGroupEntry.destroyIfCanceled.forEach((group: IGroup) => {
      group.destroy(true);
    });
  }
}