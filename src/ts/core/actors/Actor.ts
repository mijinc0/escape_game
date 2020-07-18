import * as Model from '../models';
import { EventEmitter } from 'events';
import { IActor } from './IActor';
import { IActorSprite } from './IActorSprite';

export class Actor extends EventEmitter implements IActor {
  readonly id: number;

  readonly name: string;

  readonly flags: Model.GameFlags;

  sprite?: IActorSprite;

  constructor(id: number, name: string, sprite?: IActorSprite) {
    super();
    this.id = id;
    this.name = name;
    this.flags = new Model.GameFlags();
    this.sprite = sprite ? sprite : null;
  }

  update(...data: any[]): void {
    this.emit('update', this, data);
  }
}
