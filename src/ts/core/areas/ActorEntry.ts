import { Actor } from '../actors/Actor';
import { Position } from '../models/Position';

type ActorConstructor = new (...args: ConstructorParameters<typeof Actor>) => Actor;

export class ActorEntry {
  readonly actorName: string;
  readonly eventId: number;
  readonly position: Position;
  readonly initFrame: number;
  readonly actorConstructor: ActorConstructor;

  constructor(  
    actorName: string,
    eventId: number,
    x: number,
    y: number,
    initFrame: number,
    actorConstructor: ActorConstructor,
  ){
    this.actorName = actorName;
    this.eventId = eventId;
    this.position = {x: x, y: y};
    this.initFrame = initFrame;
    this.actorConstructor = actorConstructor;
  }
}