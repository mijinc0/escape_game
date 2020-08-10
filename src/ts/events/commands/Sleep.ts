import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';

export class Sleep implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private duration: number;
  private elasped: number;

  constructor(duration: number) {
    this.duration = duration;
    this.elasped = 0;
  }

  init(scenes: IFieldScene): void {
    this.isComplete = false;
    this.elasped = 0;
  }

  update(scenes: IFieldScene, time: number, delta: number): void {
    if (this.isComplete) return;

    this.elasped += delta;

    if (this.elasped >= this.duration) {
      this.complete();
    }
  }

  complete(): void {
    this.isComplete = true;
  }
}
