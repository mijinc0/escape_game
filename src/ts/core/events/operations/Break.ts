import { IScenarioEvent } from '../IScenarioEvent';
import { ScenarioEventUpdateConfig } from '../ScenarioEventUpdateConfig';

export class Break implements IScenarioEvent {
  readonly isAsync = false;

  isComplete: boolean;

  constructor() {
    this.isComplete = false;
  }

  update(frame: number, config: ScenarioEventUpdateConfig): void {
    // Breakは進行中のイベントリストのうち、最初のイベントレンジを破棄する。
    // これによって無限に繰り返されるレンジを破棄して繰り返しを止めることが出来る。
    if (config.events) {
      config.events = config.events.slice(1);
    }

    this.complete();
    
    return;
  }
  
  complete(): void {
    this.isComplete = true;
  }
}