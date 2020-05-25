import { IGameGlobal } from './IGameGlobal';
import { GameFlags } from './models/GameFlags';
import { GameVariables } from './models/GameVariables';
import { GameItems } from './models/GameItems';
import { ItemBag } from './models/ItemBag';

export const GameGlobal: IGameGlobal = {
  flags : new GameFlags(),

  variables : new GameVariables(),
  
  items : new GameItems(),
  
  ownItems : new ItemBag(),
};

