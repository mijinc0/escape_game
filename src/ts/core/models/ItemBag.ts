import { Item } from './Item';

export class ItemBag {
  static maxItems = 99;

  private items: Item[];

  constructor() {
    this.items = [];
  }

  has(itemOrId: number | Item): boolean {
    return this.getSize(itemOrId) !== 0;
  }

  getSize(itemOrId: number | Item): number {
    const entry = this.getItem(itemOrId);
    return entry ? entry.size : 0;
  }

  add(item: Item, size: number): number {
    const limitedSize = Math.max(0, size);
    const newItemSize = Math.min(ItemBag.maxItems, this.getSize(item) + limitedSize);

    if (this.has(item)) {
      this.getItem(item).size = newItemSize;
    } else {
      item.size = newItemSize;
      this.items.push(item);
    }

    return this.getSize(item);
  }

  lost(item: Item, size: number): number {
    const limitedSize = Math.max(0, size);
    const newItemSize = Math.max(0, this.getSize(item) - limitedSize);

    if (this.has(item)) {
      this.getItem(item).size = newItemSize;
    } else {
      this.items.push(item);
    }

    return this.getSize(item);
  }

  reset(): void {
    this.items = [];
  }

  getItem(itemOrId: number | Item): Item | null {
    const storedItem =
      itemOrId instanceof Item
        ? this.items.find((entry: Item) => entry === itemOrId)
        : this.items.find((entry: Item) => entry.id === itemOrId);

    return storedItem ? storedItem : null;
  }

  getAll(): Item[] {
    return this.items;
  }
}
