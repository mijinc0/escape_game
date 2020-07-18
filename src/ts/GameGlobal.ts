import * as Model from './core/models';
import { IGameGlobal } from './core/IGameGlobal';
import { GameItems } from './items/GameItems';

export const GameGlobal: IGameGlobal = {  
  items: GameItems,
  
  flags: new Model.GameFlags(),
  
  variables: new Model.GameVariables(),
  
  ownItems: new Model.ItemBag(),
};