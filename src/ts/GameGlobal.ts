import * as Model from './core/models';
import { IGameGlobal } from './core/IGameGlobal';
import { GameTexts } from './locales/GameTexts';
import { GameItems } from './items/GameItems';

export const GameGlobal: IGameGlobal = {
  texts: GameTexts.ja,

  items: GameItems.create(GameTexts.ja.item),

  flags: new Model.GameFlags(),

  variables: new Model.GameVariables(),

  ownItems: new Model.ItemBag(),

  audioConfig: {
    bgmMaster: 0.5,
    seMaster: 0.5,
  },

  debug: false,
};
