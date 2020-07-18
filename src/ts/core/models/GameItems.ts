import { Item } from './Item';
import { IGameItems } from './IGameItems';

export class GameItems implements IGameItems {
  readonly entries: Item[];

  constructor(...items: Item[]) {
    this.entries = items;
  }

  get(name: string): Item | null {
    const item = this.entries.find((entry: Item) => entry.name === name);
    return item ? item : null;
  }
}
