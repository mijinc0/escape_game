import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';

export class Variable implements IScenarioEvent {
  readonly isAsync = true;

  isComplete: boolean;

  private key: string;
  private value: number;

  // 0 : set
  // + : add
  // - : substract
  private type: number;

  constructor(key: string, value: number, type: number) {
    this.key = key;
    this.value = value;
    this.type = type;
    this.isComplete = false;
  }

  init(scenes: IFieldScene): void {
    this.isComplete = false;
  }

  update(scenes: IFieldScene): void {
    if (this.type === 0) {
      scenes.gameGlobal.variables.set(this.key, this.value);
    } else {
      const sign = Math.sign(this.type);
      const currentValue = scenes.gameGlobal.variables.get(this.key);
      const newValue = currentValue + this.value * sign;
      scenes.gameGlobal.variables.set(this.key, newValue);
    }

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}
