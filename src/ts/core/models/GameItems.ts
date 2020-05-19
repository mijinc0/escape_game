import { Item } from './Item';

/**
 * ゲームに登場する全てのアイテム情報はここに収められる
 */
export class GameItems {
  private items: Map<string, Item>;

  constructor() {
    this.items = new Map<string, Item>();
  }

  register(item: Item): void {
    this.items.set(item.name, item);
  }

  get(name: string): Item|null {
    return this.items.get(name) ? this.items.get(name) : null;
  }
}