import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';

export class PlayActorAnim implements IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;

  private actorId: number;
  private animName: string;
  private repeat: number;
  private startAnim: boolean;

  constructor(actorId: number, animName: string, repeat?: number, async?: boolean) {
    this.actorId = actorId;
    this.animName = animName;
    this.repeat = repeat;
    this.isAsync = async ? async : false;
    this.isComplete = false;
    this.startAnim = false;
  }

  init(scene: IFieldScene): void {
    this.startAnim = false;
    this.isComplete = false;
  }

  update(scene: IFieldScene): void {
    if (this.startAnim) return;

    const actor = scene.actorsManager.findActorById(this.actorId);

    if (!actor || !actor.sprite) {
      console.warn(`actor or sprite of actor is not found {id: ${this.actorId}}`);
      this.complete();
      return;
    }

    // NOTE: ignoreIfPlayingはfalse(強制的に変える)にしているが必要であれば変更する
    // アニメーション終了時にこのイベントがcompleteになるようにcomplte関数を渡しておく
    actor.sprite.playAnim(this.animName, false, this.repeat, this.complete.bind(this));

    this.startAnim = true;
  }

  complete(): void {
    this.isComplete = true;
  }
}
