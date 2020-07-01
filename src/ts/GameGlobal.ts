import { GameItems as gameItems } from './items/GameItems';
import { IGameGlobal } from './core/IGameGlobal';
import { GameFlags } from './core/models/GameFlags';
import { GameItems } from './core/models/GameItems';
import { GameVariables } from './core/models/GameVariables';
import { ItemBag } from './core/models/ItemBag';

class GameGlobalClass implements IGameGlobal {
  constructor(
    readonly flags: GameFlags,
    readonly variables: GameVariables,
    readonly items: GameItems,
    readonly ownItems: ItemBag,
  ) {}
}

export const GameGlobal = new GameGlobalClass(
  new GameFlags(),
  new GameVariables(),
  gameItems,
  new ItemBag(),
);