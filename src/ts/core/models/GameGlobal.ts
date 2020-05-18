import { GameFlags } from '../models/GameFlags';
import { GameVariables } from '../models/GameVariables';
import { Item } from '../models/Item';

export interface GameGlobal {
  flags: GameFlags;

  variables: GameVariables;

  items: Item[];
}