import { IActorStatusPage } from './IActorStatusPage';
import { IActor } from '../actors/IActor';
import { Position } from '../models/Position';
import { Direction } from '../models/Direction';

export interface IActorEntry {
  actorObject: IActor;
  
  position: Position;
  
  statusPages: IActorStatusPage[];
  
  isSpawn: boolean;
  
  currentPageIndex: number;
}