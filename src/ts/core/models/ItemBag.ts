import { Item } from './Item';

type ItemEntry = {
  item: Item,
  size: number,
};

export class ItemBag {
  static maxItems = 99;

  private items: Map<string, ItemEntry>;

  constructor() {
    this.items = new Map<string, ItemEntry>();
  }

  has(item: string|Item): boolean {
    return !!this.getItem(item);
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
      const entry = {item: item, size: newItemSize};
      this.items.set(item.name, entry);
    }

    return this.getSize(item.name);
  }

  lost(item: Item, size: number): number {
    const limitedSize = Math.max(0, size);
    const newItemSize = Math.max(0, (this.getSize(item) - limitedSize));

    if (this.has(item)) {
      this.getItem(item).size = newItemSize;
    } else {
      const entry = {item: item, size: newItemSize};
      this.items.set(item.name, entry);
    }

    return this.getSize(item.name);
  }

  getItem(item: string|Item): ItemEntry|null {
    const storedItem = (item instanceof Item) ?
      this.items.get(item.name) :
      this.items.get(item);

    return storedItem ? storedItem : null;
  }
}