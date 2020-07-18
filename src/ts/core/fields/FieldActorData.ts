import * as Actor from '../actors';
import * as Model from '../models';
import { IFieldActorStatusPage } from './IFieldActorStatusPage';

export class FieldActorData {
  constructor(
    public actorObject: Actor.IFieldActor,
    public position: Model.Position,
    public statusPages: IFieldActorStatusPage[],
    public isSpawn: boolean,
    public currentPageIndex: number,
  ) {}
}
