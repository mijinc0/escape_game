import { Actor } from '../actors/Actor';
import { SpriteConfig } from '../actors/SpriteConfig';
import { Position } from '../models/Position';

type ActorConstructor = new (...args: ConstructorParameters<typeof Actor>) => Actor;

export class ActorEntry {
  readonly actorName: string;
  readonly eventId: number;
  readonly position: Position;
  readonly spriteConfig: SpriteConfig;
  readonly initFrame: number;
  readonly actorConstructor: ActorConstructor;

  constructor(  
    actorName: string,
    eventId: number,
    position: Position,
    spriteConfig: SpriteConfig,
    initFrame: number,
    actorConstructor: ActorConstructor,
  ){
    this.actorName = actorName;
    this.eventId = eventId;
    this.position = position;
    this.spriteConfig = spriteConfig;
    this.initFrame = initFrame;
    this.actorConstructor = actorConstructor;
  }
}