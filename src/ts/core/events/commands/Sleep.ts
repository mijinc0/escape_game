import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';

export class Sleep implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  private counter: number;
  private sleepCount: number;
  
  constructor(frame: number) {
    this.counter = 0;
    this.sleepCount = frame;
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
    this.counter = this.sleepCount;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    this.counter--;

    if (this.counter <= 0) {
      this.isComplete = true;
    }
  }

  complete(): void {
    this.isComplete = true;
  }
}