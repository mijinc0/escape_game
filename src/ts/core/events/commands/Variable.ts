import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';

export class Variable implements IScenarioEvent {
  readonly isAsync = true;

  isComplete: boolean;

  private key: string;
  private value: number;
  
  // 0 : set
  // + : add
  // - : substract
  private type: number;
  
  constructor(
    key: string,
    value: number,
    type: number,
  ) {
    this.key = key;
    this.value = value;
    this.type = type;
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

    if (this.type === 0) {
      config.gameGlobal.variables.set(this.key, this.value);

    } else {
      const sign = Math.sign(this.type);
      const currentValue = config.gameGlobal.variables.get(this.key);
      const newValue = currentValue + (this.value * sign);
      config.gameGlobal.variables.set(this.key, newValue);
    }

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}