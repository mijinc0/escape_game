import { IScenarioEvent } from '../IScenarioEvent';
import { Item as ItemObject } from '../../models/Item';
import { IGameGlobal } from '../../IGameGlobal';

export class Item implements IScenarioEvent{
  static readonly maxOwnItems = 99;

  isComplete: boolean;
  isAsync: boolean;

  private gameGlobal: IGameGlobal;
  private itemName: string;
  private delta: number;

  constructor(
    gameGlobal: IGameGlobal,
    itemName: string,
    delta: number,
    async = false,
  ) {
    this.gameGlobal = gameGlobal;
    this.itemName = itemName;
    this.delta = delta;
    this.isAsync = async;
    this.isComplete = false; 
  }

  update(frame: number): void {
    if (this.delta > 0) {
      this._getItem(this.itemName, this.delta);
    } else {
      this._lostItem(this.itemName, this.delta * -1);
    }

    this.complete(frame);
  }

  complete(frame: number): void {
    this.isComplete = true;
  }

  private _getItem(itemName: string, num: number): ItemObject|null {
    const item = this.gameGlobal.items.get(itemName);

    // アイテムデータが存在しない
    if (!item) return null;

    this.gameGlobal.ownItems.add(item, num);
  }

  private _lostItem(itemName: string, num: number): void {
    const item = this.gameGlobal.items.get(itemName);

    // アイテムデータが存在しない
    if (!item) return null;

    this.gameGlobal.ownItems.lost(item, num);
  }
}