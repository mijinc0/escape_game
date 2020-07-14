import { IActorStatusPage } from './IActorStatusPage';
import { IActor } from '../actors/IActor';
import { Position } from '../models/Position';

export class FieldActorData {
  constructor (
    public actorObject: IActor,
    public position: Position,
    public statusPages: IActorStatusPage[],
    public isSpawn: boolean,
    public currentPageIndex: number,
  ) {}
}