import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';

export class Return implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  init(frame: number, config: ScenarioEventUpdateConfig): void {
    this.isComplete = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    // 全てのイベントレンジを破棄する
    if (config.events) {
      config.events.splice(0);
    }

    // 進行中のイベントを全てcompleteする
    if (config.currentEvents) {
      config.currentEvents.forEach((event: IScenarioEvent) => {
        event.complete();
        // 殆どの場合、complete()でフラグが立つが、念の為立てておく
        event.isComplete = true;
      });
    }

    this.complete();

    return;
  }

  complete(): void {
    this.isComplete = true;
  }
}