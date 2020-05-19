import { IGameGlobal } from './IGameGlobal';
import { GameFlags } from './models/GameFlags';
import { GameVariables } from './models/GameVariables';
import { GameItems } from './models/GameItems';
import { ItemBag } from './models/ItemBag';

class GameGlobalClass implements IGameGlobal {
  flags: GameFlags;
  variables: GameVariables;
  items: GameItems;
  ownItems: ItemBag;

  constructor() {
    this.flags = new GameFlags();
    this.variables = new GameVariables();
    this.items = new GameItems();
    this.ownItems = new ItemBag();
  }

  reset(): void {
    this.flags = new GameFlags();
    this.variables = new GameVariables();
    this.items = new GameItems();
    this.ownItems = new ItemBag();
  }
}

export const GameGlobal = new GameGlobalClass();

