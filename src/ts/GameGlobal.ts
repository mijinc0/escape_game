import { GameItems } from './items/GameItems';
import { IGameGlobal } from './core/IGameGlobal';
import { GameFlags } from './core/models/GameFlags';
import { GameVariables } from './core/models/GameVariables';
import { ItemBag } from './core/models/ItemBag';

export const GameGlobal: IGameGlobal = {  
  items: GameItems,
  
  flags: new GameFlags(),
  
  variables: new GameVariables(),
  
  ownItems: new ItemBag(),
};