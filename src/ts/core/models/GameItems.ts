import { Item } from './Item';
import { IGameItems } from './IGameItems';

export class GameItems implements IGameItems {
  readonly entries: Item[];

  constructor(...items: Item[]) {
    this.entries = items;
  }

  get(id: number): Item | null {
    const item = this.entries.find((entry: Item) => entry.id === id);
    return item ? item : null;
  }
}
