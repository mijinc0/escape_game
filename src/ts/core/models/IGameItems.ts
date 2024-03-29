import { Item } from './Item';

/**
 * ゲームに登場する全てのアイテム情報はここに収められる
 */
export interface IGameItems {
  entries: Item[];

  get(id: number): Item | null;
}
