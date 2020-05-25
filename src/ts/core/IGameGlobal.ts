import * as Phaser from 'phaser';
import { GameFlags } from './models/GameFlags';
import { GameVariables } from './models/GameVariables';
import { GameItems } from './models/GameItems';
import { ItemBag } from './models/ItemBag';

/**
 * グローバルに置いておきたいもの
 */
export interface IGameGlobal {
  flags: GameFlags;

  variables: GameVariables;

  items: GameItems;

  ownItems: ItemBag;
}