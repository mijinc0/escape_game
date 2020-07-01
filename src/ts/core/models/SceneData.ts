import { ISceneData } from './ISceneData';
import { Direction } from './Direction';
import { GameFlags } from './GameFlags';
import { GameVariables } from './GameVariables';
import { Item } from './Item';
import { ItemBag } from './ItemBag';
import { IGameGlobal } from '../IGameGlobal';

export class SceneData implements ISceneData {
  readonly areaId: number;
  readonly heroX: number;
  readonly heroY: number;
  readonly heroDirection: Direction;
  readonly flags: GameFlags;
  readonly variables: GameVariables;
  readonly ownItems: ItemBag;

  constructor(
    areaId: number,
    heroX: number,
    heroY: number,
    heroDirection: Direction,
    flags?: GameFlags,
    variables?: GameVariables,
    ownItems?: ItemBag,
  ) {
    this.areaId = areaId;
    this.heroX = heroX;
    this.heroY = heroY;
    this.heroDirection = heroDirection;
    this.flags = flags ? flags : new GameFlags();
    this.variables = variables ? variables : new GameVariables();
    this.ownItems = ownItems ? ownItems : new ItemBag();
  }

  // NOTE: 暫定
  serialize(): string {
    return '';
  }

  applyGameGlobal(gameGlobal: IGameGlobal): void {
    gameGlobal.flags.reset();
    gameGlobal.variables.reset();
    gameGlobal.ownItems.reset();

    this.flags.forEach((value: boolean, key: string) => {
      gameGlobal.flags.on(key);
    });

    this.variables.forEach((value: number, key: string) => {
      gameGlobal.variables.set(key, value);
    });

    this.ownItems.getAll().forEach((item: Item) => {
      gameGlobal.ownItems.add(item, item.size);
    });
  }
}