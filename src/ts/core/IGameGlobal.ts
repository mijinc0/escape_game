import * as Model from './models';
/**
 * グローバルに置いておきたいもの
 */
export interface IGameGlobal {
  flags: Model.GameFlags;

  variables: Model.GameVariables;

  items: Model.GameItems;

  ownItems: Model.ItemBag;
}