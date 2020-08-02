import * as Event from '../../core/events';
import * as Model from '../../core/models';
import * as Scene from '../../core/scenes';

export class ChangeActorDirection implements Event.IScenarioEvent {
  readonly isAsync: boolean;

  isComplete: boolean;

  private actorId: number;
  private direction: Model.Direction;

  constructor(actorId: number, direction: Model.Direction, isAsync?: boolean) {
    this.actorId = actorId;
    this.direction = direction;
    this.isAsync = isAsync ? isAsync : false;
    this.isComplete = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: Scene.IFieldScene): void {
    const actor = this.actorId >= 0 ?
      scene.actorsManager.findActorById(this.actorId) :
      scene.primaryActor;

    if (!actor || !actor.sprite) {
      console.warn(`actor sprite is not found. actor changing direction event will be completed {id: ${this.actorId}}`);
      this.complete();
      return;
    }

    actor.sprite.direction = this.direction;

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}
