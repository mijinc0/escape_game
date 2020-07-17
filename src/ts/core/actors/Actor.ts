import { EventEmitter } from 'events';
import { IActor } from './IActor';
import { IActorSprite } from './IActorSprite';
import { GameFlags } from '../models/GameFlags';

export class Actor extends EventEmitter implements IActor {
  readonly id: number;
  
  readonly name: string;

  readonly flags: GameFlags;
  
  sprite?: IActorSprite;

  constructor(
    id: number,
    name: string,
    sprite?: IActorSprite,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.flags = new GameFlags();
    this.sprite = sprite ? sprite : null;
  }

  update(...data: any[]): void {
    this.emit('update', this, data);
  }
}