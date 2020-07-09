import { IActorEntry } from './IActorEntry';
import { IActorStatusPage } from './IActorStatusPage';
import { IActor } from '../actors/IActor';
import { Position } from '../models/Position';
import { Direction } from '../models/Direction';

export class ActorEntry implements IActorEntry {
  readonly actorObject: IActor;
  readonly position: Position;
  readonly direction: Direction;
  readonly statusPages: IActorStatusPage[];

  isSpawn: boolean;
  currentPageIndex: number;

  constructor(  
    actorObject: IActor,
    direction: Direction,
    statusPages: IActorStatusPage[],
    position?: Position,
  ){
    this.actorObject = actorObject;
    this.direction = direction;
    this.statusPages = statusPages;
    this.position = position ? position : {x: 0, y: 0};
    this.isSpawn = false;
    this.currentPageIndex = -1;
  }
}