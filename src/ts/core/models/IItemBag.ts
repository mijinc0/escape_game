import { Item } from './Item';

type ItemEntry = {item: Item, size: number};

export interface IItemBag {
  has(item: string|Item): boolean;

  getSize(item: string|Item): number;

  add(item: Item, size: number): number;

  lost(item: Item, size: number): number;

  getItem(item: string|Item): ItemEntry|null;
}