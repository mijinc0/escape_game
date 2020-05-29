import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';
import { Item as ItemObject } from '../../models/Item';
import { IGameGlobal } from '../../IGameGlobal';

export class Item implements IScenarioEvent {
  static readonly maxOwnItems = 99;
  
  readonly isAsync = true;

  isComplete: boolean;

  private itemName: string;
  private delta: number;

  constructor(itemName: string, delta: number) {
    this.itemName = itemName;
    this.delta = delta;
    this.isComplete = false; 
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    if (!config.gameGlobal) {
      console.warn('ScenarioEventUpdateConfig has not game global store');
      this.isComplete = true;
      return;
    }

    if (this.delta > 0) {
      this._getItem(this.itemName, this.delta, config.gameGlobal);
    } else {
      this._lostItem(this.itemName, this.delta * -1, config.gameGlobal);
    }

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }

  private _getItem(itemName: string, num: number, gameGlobal: IGameGlobal): ItemObject|null {
    const item = gameGlobal.items.get(itemName);

    // アイテムデータが存在しない
    if (!item) return null;

    gameGlobal.ownItems.add(item, num);
  }

  private _lostItem(itemName: string, num: number, gameGlobal: IGameGlobal): void {
    const item = gameGlobal.items.get(itemName);

    // アイテムデータが存在しない
    if (!item) return null;

    gameGlobal.ownItems.lost(item, num);
  }
}