import { ISelector } from './ISelector';
import { ISelectorCursor } from './ISelectorCursor';
import { SelectorEventNames } from './SelectorEventNames';
import { Direction } from '../Direction';
import { IElement } from '../IElement';
import { IGroup } from '../group/IGroup';
import { Keys } from '../../input/Keys';

type GroupHistoryEntry = {
  group: IGroup,
  destroyIfCanceled: IElement[],
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

  setGroup(managedGroup: IGroup, destroyIfCanceled?: IElement[]): void {
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
      
    // 次のノードが無いまたはnextとcurrentが同じであれば即return 何もしない
    if (!next || current === next) return;

    this._moveCursor(next, current);

    // クールダウンを設定して終了
    this._setCooldownTime();
  }

  private _getCurrentGroup(): IGroup|null {
    return this.groupHistory[0] ? this.groupHistory[0].group : null;
  }

  private _getCurrentElement(): IElement|null {
    const currentGroup = this._getCurrentGroup();

    return currentGroup ? currentGroup.getCurrent() : null;
  }

  private _setCooldownTime(): void {
    this.cooldownCount = this.cooldownTime;
  }

  private _select(): void {
    const currentElement = this._getCurrentElement();
    if (!currentElement) return;

    currentElement.emit(SelectorEventNames.Select, currentElement, this);
  
    this._setCooldownTime();
  }

  private _cancel(): void {
    if (this.groupHistory.length < 2) return;

    // shiftすることで、現在のgroupを削除して一つ前に選択していたgroupを先頭に(現在の管理対象に)する
    const unhandledGroup = this.groupHistory.shift();
    const currentElement = unhandledGroup.group.getCurrent();

    // 最初に length < 2 をしているのでここでは必ずelementが取得できる
    const returningElement = this._getCurrentElement();
    
    // unhandledGroupを削除する前にカーソルの移動を行う
    this._moveCursor(returningElement, currentElement);

    unhandledGroup.destroyIfCanceled.forEach((entry: IElement) => {
      entry.destroy(true);
    });

    this._setCooldownTime();
  }

  private _moveCursor(next: IElement, current?: IElement): void {
    if (current) {  
      current.emit(SelectorEventNames.Out, current, this);
    }

    // カーソルを移動させる
    this.cursor.goTo(next);
    next.emit(SelectorEventNames.Over, next, this);
  }
}