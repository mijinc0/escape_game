import { Item } from './Item';
import { IItemBag } from './IItemBag';

export class ItemBag implements IItemBag {
  static maxItems = 99;

  private items: Item[];

  constructor() {
    this.items = [];
  }

  has(item: string|Item): boolean {
    return this.getSize(item) !== 0;
  }

  getSize(item: string|Item): number {
    const entry = this.getItem(item);
    return entry ? entry.size : 0;
  }

  add(item: Item, size: number): number {
    const limitedSize = Math.max(0, size);
    const newItemSize = Math.min(ItemBag.maxItems, (this.getSize(item) + limitedSize));

    if (this.has(item)) {
      this.getItem(item).size = newItemSize;
    } else {
      this.items.push(item);
    }

    return this.getSize(item);
  }

  lost(item: Item, size: number): number {
    const limitedSize = Math.max(0, size);
    const newItemSize = Math.max(0, (this.getSize(item) - limitedSize));

    if (this.has(item)) {
      this.getItem(item).size = newItemSize;
    } else {
      this.items.push(item);
    }

    return this.getSize(item);
  }

  getItem(item: string|Item): Item|null {
    const storedItem = (item instanceof Item) ?
      this.items.find((entry: Item) => (entry === item)) :
      this.items.find((entry: Item) => (entry.name === item));

    return storedItem ? storedItem : null;
  }
}