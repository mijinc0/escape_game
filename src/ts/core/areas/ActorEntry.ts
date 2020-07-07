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
    position: Position,
    direction: Direction,
    statusPages: IActorStatusPage[],
  ){
    this.actorObject = actorObject;
    this.position = position;
    this.direction = direction;
    this.statusPages = statusPages;
    this.isSpawn = false;
    this.currentPageIndex = -1;
  }
}