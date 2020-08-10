import * as Event from '../../core/events';
import * as Actor from '../../core/actors';
import * as Util from '../../core/utils';
import * as Scene from '../../core/scenes';

export class ActorSpriteTint implements Event.IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;

  private actorId: number;
  private duration: number;
  private elasped: number;
  private startColor: number;
  private targetColor: number;
  private sprite: Actor.IActorSprite;

  constructor(actorId: number, color: number, duration: number, async?: boolean) {
    this.actorId = actorId;
    this.targetColor = color;
    this.duration = duration;
    this.elasped = 0;
    this.startColor = 0x000000;
    this.isComplete = false;
    this.sprite = null;
    this.isAsync = async ? async : false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
    this.elasped = 0;

    const actor = this.actorId >= 0 ?
      scene.actorsManager.findActorById(this.actorId) :
      scene.primaryActor;

    if (!actor || !actor.sprite) {
      console.warn(`actor sprite is not found. actor moving event will be completed {id: ${this.actorId}}`);
      this.complete();
      return;
    }

    this.sprite = actor.sprite;
    this.startColor = actor.sprite.tint ? actor.sprite.tint : 0x000000;    
  }

  update(scene: Scene.IFieldScene, time: number, delta: number): void {
    if (this.isComplete) return;

    this.elasped += delta;

    const progress = Util.MathUtil.clamp(this.elasped / this.duration, 1, 0);

    // delta
    const dColor = this.targetColor - this.startColor;
    const dR = (dColor & 0xff0000) >> 16;
    const dG = (dColor & 0x00ff00) >> 8;
    const dB = (dColor & 0x0000ff);

    // current
    const cR = dR * progress;
    const cG = dG * progress;
    const cB = dB * progress;

    // concat
    const rgb = (cR << 16) | (cG << 8) | cB;

    this.sprite.tint = (this.startColor + rgb);

    if (progress === 1) {
      this.complete();
    }
  }

  complete(): void {
    this.sprite = null;
    this.isComplete = true;
  }
}
