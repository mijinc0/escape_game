import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

export class ActorSpriteAlpha implements Event.IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;

  private actorId: number;
  private duration: number;
  private targetAlpha: number;

  constructor(actorId: number, alpha: number, duration: number, async?: boolean) {
    this.actorId = actorId;
    this.targetAlpha = alpha;
    this.duration = duration;
    this.isComplete = false;
    this.isAsync = async ? async : false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;

    const actor = this.actorId >= 0 ? scene.actorsManager.findActorById(this.actorId) : scene.primaryActor;

    if (!actor || !actor.sprite) {
      console.warn(`actor sprite is not found. actor moving event will be completed {id: ${this.actorId}}`);
      this.complete();
      return;
    }

    const startAlpha = actor.sprite.alpha;

    scene.phaserScene.add.tween({
      targets: actor.sprite,
      duration: this.duration,
      alpha: { from: startAlpha, to: this.targetAlpha },
      onComplete: this.complete.bind(this),
    });
  }

  update(scene: Scene.IFieldScene, time: number, delta: number): void {}

  complete(): void {
    this.isComplete = true;
  }
}
