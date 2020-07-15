import { IFieldActorStatusPage } from './IFieldActorStatusPage';
import { IActor } from '../actors/IActor';
import { Position } from '../models/Position';

export class FieldActorData {
  constructor (
    public actorObject: IActor,
    public position: Position,
    public statusPages: IFieldActorStatusPage[],
    public isSpawn: boolean,
    public currentPageIndex: number,
  ) {}
}