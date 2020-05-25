import { Position } from '../models/Position';

export class ActorPosition {
  readonly id: number;

  actorId: number;
  
  positon: Position;

  constructor(
    id: number,
    actorId: number,
    positon: Position,
  ) {
    this.id = id;
    this.actorId = actorId;
    this.positon = positon;
  }
}