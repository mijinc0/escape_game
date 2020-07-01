import { Direction } from './Direction';
import { GameFlags } from './GameFlags';
import { GameVariables } from './GameVariables';
import { ItemBag } from './ItemBag';
import { ISerializable } from './ISerializable';
import { IGameGlobal } from '../IGameGlobal';

export interface ISceneData extends ISerializable {
  areaId: number;

  heroX: number;

  heroY: number;

  heroDirection: Direction;

  flags?: GameFlags;

  variables?: GameVariables;

  ownItems?: ItemBag;

  applyGameGlobal(gameGlobal: IGameGlobal): void;
}