import * as Model from '../models';

export class ActorPosition {
  readonly id: number;

  actorId: number;

  positon: Model.Position;

  constructor(id: number, actorId: number, positon: Model.Position) {
    this.id = id;
    this.actorId = actorId;
    this.positon = positon;
  }
}
