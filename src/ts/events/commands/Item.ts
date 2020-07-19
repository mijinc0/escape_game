import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { Item as ItemObject } from '../../core/models/Item';
import { IGameGlobal } from '../../core/IGameGlobal';
import { IFieldScene } from '../../core/scenes/IFieldScene';

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

  init(scene: IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: IFieldScene): void {
    if (this.delta > 0) {
      this._getItem(this.itemName, this.delta, scene.gameGlobal);
    } else {
      this._lostItem(this.itemName, this.delta * -1, scene.gameGlobal);
    }

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }

  private _getItem(itemName: string, num: number, gameGlobal: IGameGlobal): ItemObject | null {
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
