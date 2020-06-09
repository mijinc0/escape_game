import { Item } from './Item';

/**
 * ゲームに登場する全てのアイテム情報はここに収められる
 */
export class GameItems {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  register(item: Item): void {
    this.items.push(item);
  }

  get(name: string): Item|null {
    const item = this.items.find((entry: Item) => (entry.name === name));
    return item ? item : null;
  }
}