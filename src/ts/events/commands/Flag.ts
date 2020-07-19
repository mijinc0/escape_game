import { IScenarioEvent } from '../../core/events/IScenarioEvent';
import { IFieldScene } from '../../core/scenes/IFieldScene';

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

  init(scene: IFieldScene): void {
    this.isComplete = false;
  }

  update(scene: IFieldScene): void {
    if (this.value === 0) {
      scene.gameGlobal.flags.toggle(this.key);
    } else {
      this.value > 0 ? scene.gameGlobal.flags.on(this.key) : scene.gameGlobal.flags.off(this.key);
    }

    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}
