import * as Model from './core/models';
import { IGameGlobal } from './core/IGameGlobal';
import { GameTexts } from './locales/GameTexts';
import { GameItems } from './items/GameItems';

export const GameGlobal: IGameGlobal = {
  texts: GameTexts.ja,
  
  items: GameItems(GameTexts.ja.item),

  flags: new Model.GameFlags(),

  variables: new Model.GameVariables(),

  ownItems: new Model.ItemBag(),

  debug: false,
};
