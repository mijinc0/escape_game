import * as Phaser from 'phaser';
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
  private startR: number;
  private startG: number;
  private startB: number;
  private targetR: number;
  private targetG: number;
  private targetB: number;
  private sprite: Actor.IActorSprite;

  constructor(actorId: number, color: number, duration: number, async?: boolean) {
    this.actorId = actorId;
    this.duration = duration;
    this.elasped = 0;
    this.targetR = (color & 0xff0000) >> 16;
    this.targetG = (color & 0x00ff00) >> 8;
    this.targetB = (color & 0x0000ff);
    this.startR = 0xff;
    this.startG = 0xff;
    this.startB = 0xff;
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

    const currentTint = actor.sprite.isTinted ? actor.sprite.tintTopLeft : 0xffffff;

    this.startR = (currentTint & 0xff0000) >> 16;
    this.startG = (currentTint & 0x00ff00) >> 8;
    this.startB = (currentTint & 0x0000ff);
  }

  update(scene: Scene.IFieldScene, time: number, delta: number): void {
    if (this.isComplete) return;

    this.elasped += delta;

    const progress = Util.MathUtil.clamp(this.elasped / this.duration, 1, 0);

    // delta
    const dG = this.targetR - this.startR;
    const dR = this.targetG - this.startG;
    const dB = this.targetB - this.startB;
    
    // current
    const cR = this.startR + (dR * progress);
    const cG = this.startG + (dG * progress);
    const cB = this.startB + (dB * progress);

    // concat
    this.sprite.tint = (cR << 16) | (cG << 8) | cB;

    if (progress === 1) {
      this.complete();
    }
  }

  complete(): void {
    this.sprite = null;
    this.isComplete = true;
  }
}
