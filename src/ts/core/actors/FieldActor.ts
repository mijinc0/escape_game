import * as Scene from '../scenes';
import { Actor } from './Actor';
import { IActorSprite } from './IActorSprite';

export class FieldActor extends Actor {
  eventId: number;

  constructor(
    id: number,
    name: string,
    sprite?: IActorSprite,
    eventId?: number,
  ) {
    super(id, name, sprite);

    this.eventId = eventId ? eventId : -1;
  }

  update(scene: Scene.IFieldScene): void {
    this.emit('update', this, scene);
  }
}