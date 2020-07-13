import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';

export class Sleep implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private counter: number;
  private sleepCount: number;
  
  constructor(frame: number) {
    this.counter = 0;
    this.sleepCount = frame;
  }

  init(scenes: IFieldScene): void {
    this.isComplete = false;
    this.counter = this.sleepCount;
  }

  update(scenes: IFieldScene): void {
    this.counter--;

    if (this.counter <= 0) {
      this.isComplete = true;
    }
  }

  complete(): void {
    this.isComplete = true;
  }
}