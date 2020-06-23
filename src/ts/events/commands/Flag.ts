import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../../core/events/ScenarioEventUpdateConfig';

export class Flag implements IScenarioEvent {
  readonly isAsync = true;

  isComplete: boolean;

  private key: string;

  // 0 : toggle
  // + : on
  // - : off
  private value: number;
  
  constructor(key: string, value: number) {
    this.key = key;
    this.value = value;
    this.isComplete = false; 
  }

  init(config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    if (!config.gameGlobal) {
      console.warn('ScenarioEventUpdateConfig has not game global store');
      this.isComplete = true;
      return;
    }

    if (this.value === 0) {
      config.gameGlobal.flags.toggle(this.key);

    } else {
      (this.value > 0) ? config.gameGlobal.flags.on(this.key) : config.gameGlobal.flags.off(this.key);
    }

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}